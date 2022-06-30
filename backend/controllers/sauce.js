const Sauce = require('../models/Sauce');

// Ajoute un objet Sauce
exports.createSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
    if (sauce.userId != req.auth.userId) {
      res.status(401).json({ message: 'Not authorized' });
    } else {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
          .catch(error => res.status(401).json({ error }));
      });
    }
  })
  .catch(error => {
    res.status(500).json({ error });
  });
};

// Modification d'un objet Sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete thingObject._userId;
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
          .catch(error => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
}

// Suppression objet Sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json())
    .catch(error => res.status(404).json({ error }));
}

// Lecture d'un objet Sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((Sauce) => res.status(200).json(Sauce))
    .catch(error => res.status(404).json({ error }));
}

// Lecture de tous les objets Sauce
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(Sauce => res.status(200).json(Sauce))
    .catch(error => res.status(400).json({ error }));
}