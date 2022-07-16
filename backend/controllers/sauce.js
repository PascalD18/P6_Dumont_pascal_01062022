const Sauce = require('../models/Sauce');
const fs = require('fs');

// Ajoute un objet Sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => { res.status(201).json({ message: 'Sauce enregistrée !' }) })
    .catch(error => { res.status(400).json({ error }) })
}

// Modification d'un objet Sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }
  delete sauceObject._userId;
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
        next();
      } else {

        //Vérifie si il existe déjà une photo correspondante sur le serveur
        if (req.file !== undefined) {

          // Si il existe déjà une photo sur le serveur 
          // => compare avec celle contenue dans l'Url du formulaire
          const filename = sauce.imageUrl.split('/images/')[1];
          if (req.file.filename != filename) {

            // Si la photo sur le serveur est différente de celle contenue dans l'Url du formulaire
            // Efface l'ancienne photo située sur le serveur
            fs.unlink(`images/${filename}`, () => {
            })
          };
        };
      }
      Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
        .catch(error => res.status(401).json({ error }));
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
}

exports.likedNoLiked = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (req.body.like == 1) {

        // Si like = 1 => Incrémente likes et ajoute l'utilisateur dans tableau 'usersLiked'
        Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } })
          .then(() => res.status(200).json({ message: "Incremente likes et ajoute un utilisateur qui aime !" }))
          .catch(error => res.status(400).json({ error }))
      } else if (req.body.like == -1) {

        // Si Like = -1 => Incrémente dislikes et ajoute l'utilisateur dans tableau 'usersDisliked'
        Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } })
          .then(() => { res.status(200).json({ message: "Ajoute un utilisateur qui n' aime pas !" }) })
          .catch(error => res.status(400).json({ error }))
      } else {
        if (sauce.usersLiked.includes(req.body.userId)) {

          // Si like = 0, et que l'utilisateur est dans le tableau 'usersLiked'
          Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } })
            .then(() => { res.status(200).json({ message: "Décrément likes et enléve un utilisateur qui aime !" }) })
            .catch(error => res.status(400).json({ error }))
        } else {

          // Sinon, si like = 0, cela signifie que l'utilisateur est dans le tableau 'usersDisliked'
          Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } })
            .then(() => { res.status(200).json({ message: "Décrémente Dislikes et enléve un utilisateur qui n'aime pas !" }) })
            .catch(error => res.status(400).json({ error }))
        }
      };
    })
    .catch(error => res.status(400).json({ error }))
}

// Suppression objet Sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(204).json({ message: 'Sauce supprimée !' }))
            .catch(error => res.status(400).json({ error }));
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
}

// Lecture d'un objet Sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
}

// Lecture de tous les objets Sauce
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error: error }))
}

