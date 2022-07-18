const passwordValidator = require('password-validator');
const validatorData = require('validator')

//Création du shéma de saisie de l'email
const emailSchema = new passwordValidator()

    //Utilisation du plugin pour que le format de l'email soit respecté
    .usingPlugin(validatorData.isEmail);

//Module de validation de l'email
module.exports.email = (req, res, next) => {
    if (emailSchema.validate(req.body.email)) {
        next();
    } else {
        return res.status(400).json({
            message: 'Adresse email incorrecte'
        });
    };
}

//Création du shemas de validation du mot de passe
const passwordSchema = new passwordValidator()

// Définition du shemas que doit respecter le mot de passe
passwordSchema
    .is().min(8)
    .has().uppercase(2) // Doit contenir au moins 2 lettres majuscules
    .has().lowercase(2) // Doit contenir au moins 2 lettres minuscules
    .has().digits(2) // Doit contenir au moins 2 chiffres
    .not(/[/%*&+\(){}=[]]/) // Evite d'utiliser certains digits spécifiques
    .has(/[!-#._$£^]/) // Caracteres spéciaux à inclure dans le mot de passe

// Module de validation du mot de passe
module.exports.password = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
        return res.status(400).json({
            message: `Le mot de passe doit avoir les caractéristiques suivantes :
           - 8 caractéres minimum 
           - 2 Majuscules
           - 2 minuscules
           - Ne doit pas contenir un des caracteres spéciaux suivants :
             / \ % & + ( ) { } = [ ]
           - Doit contenir au moins un des caracteres suivants :
             ! - # . _ $ £ ^ `
        });
    }
};
