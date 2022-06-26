const Sauce = require('../models/Sauce');

// Ajoute un objet Sauce
exports.createSauce = (req, res, next) => {
  delete req.body._id;
  const Sauce = new Sauce({
    ...req.body
  });
  Sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré' }))
    .catch(error => res.status(400).json({ error }));
};

// Modification d'un objet Sauce
exports.modifySauce = (req, res, next) => {
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json())
    .catch(error => res.status(404).json({ error }));
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