// Validation de la saisie du fabricant de sauce
const { deleteSauce } = require('../controllers/sauce');
const Sauce = require('../models/Sauce');
exports.manufacturer = (req, res, next) => {
  //  var sauceObject = JSON.parse(req.body.sauce);
    // Création du formulaire de la sauce dans l'objet 'sauce'
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {

            // Vérifie la saisie de manufacturer
            let valideDataSauce = new RegExp(/^[a-z-A-Z]+$/);
            if (valideDataSauce.test(req.body.manufacturer)) {
                next();
            } else {
                
            //Reponse de l'erreur si la saisie contient des chiffres
             return res.status(400).json({ message: `Ne saisir que des lettres pour le champs 'manufacturer'. ` });
            }
        })
        .catch(error => res.status(400).json({ error }))
};