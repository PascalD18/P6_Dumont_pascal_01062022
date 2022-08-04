const Sauce = require('../models/Sauce');
const fs = require('fs');


// Ajoute un objet Sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;

  // Création du formulaire de la sauce dans l'objet 'sauce'
  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  // Enregistrement du formulaire de la sauce
  sauce.save()
    .then(() => { res.status(201).json({ message: 'Sauce enregistrée !' }) })
    .catch(error => { res.status(400).json({ error }) })
}

// Modification d'un objet Sauce
exports.modifySauce = (req, res, next) => {

  // Vérifie si une image a était selectionnée et enregistrée avec un nom unique
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),

      // Si oui, définit le nouvel Url avec le nom unique de l'image selectionnée
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

      // Sinon, renseigne le formulaire sauf 'imageUrl'
    } : { ...req.body }


  //Vérifie si l'utilisateur corresponds à la requéte
  if (req.body.userId != req.auth.userId) {
    res.status(401).json({ message: 'Not authorized' });
  } else {

    // Si oui, et si une image a été selectionnée ( ou même reselectionnée !)
    if (req.file !== undefined) {
      // Efface l'ancien fichier correspondant à l'image avant MAJ
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {

          //Définit le nom du fichier correspondant, avec son Url avant MAJ
          const filename = sauce.imageUrl.split('/images/')[1];

          // Et l'efface pour ne pas laisser de fichier image inutile sur le serveur
          // ('Multer' à déjà sélectionné et enregistré sur le serveur, 
          // un autre nom fichier image correspondant avec un nom unique ... )
          fs.unlink(`images/${filename}`, () => {
          })

        });
    }

    // Met à jour le formulaire
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
      .catch(error => res.status(401).json({ error }))
  }

};
exports.likedNoLiked = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (req.body.like == 1 && !sauce.usersLiked.includes(req.auth.userId)) {

        // Si l'utilisateur authentifié n'est pas contenu dans tableau 'usersLiked'
        // Et si like = 1 => Incrémente likes et ajoute l'utilisateur dans tableau 'usersLiked'
        Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.auth.userId } })
          .then(() => res.status(200).json({ message: "Incremente likes et ajoute un utilisateur qui aime !" }))
          .catch(error => res.status(400).json({ error }))
      } else if (req.body.like == -1 && !sauce.usersDisliked.includes(req.auth.userId)) {

        // Si l'utilisateur authentifié n'est pas contenu dans tableau 'usersDisliked'
        // Et si Like = -1 => Incrémente dislikes et ajoute l'utilisateur dans tableau 'usersDisliked'
        Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.auth.userId } })
          .then(() => { res.status(200).json({ message: "Ajoute un utilisateur qui n' aime pas !" }) })
          .catch(error => res.status(400).json({ error }))
      } else {
        if (sauce.usersLiked.includes(req.auth.userId)) {

          // Si like = 0, et que l'utilisateur est dans le tableau 'usersLiked'
          Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.auth.userId } })
            .then(() => { res.status(200).json({ message: "Décrément likes et enléve un utilisateur qui aime !" }) })
            .catch(error => res.status(400).json({ error }))
        } else {

          // Sinon, si like = 0, cela signifie que l'utilisateur est dans le tableau 'usersDisliked'
          Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.auth.userId } })
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

