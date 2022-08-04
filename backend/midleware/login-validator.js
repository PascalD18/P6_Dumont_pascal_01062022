const passwordValidator = require('password-validator');
const validatorData = require('validator')

//Création du shéma de saisie de l'email
const emailSchema = new passwordValidator()

    //Utilisation du plugin pour que le format de l'email soit respecté
    .usingPlugin(validatorData.isEmail);

//Module de validation de l'email
exports.email = (req, res, next) => {
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
    .has().uppercase() // Doit contenir au moins 1 lettre majuscule
    .has().lowercase() // Doit contenir au moins 1 lettre minuscule
    .has().digits(2) // Doit contenir au moins 1 chiffre
    .has(/[!$]/) // Doit contenir au moins ! ou - 

// Module de validation du mot de passe
exports.password = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
        return res.status(400).json({
            message: `Le mot de passe doit avoir les caractéristiques suivantes :
           - 8 caractéres minimum 
           - 1 Majuscule au minimum
           - 1 minuscule au minimum
           - Doit contenir au moins un des caracteres suivants :
             ! $`
        });
    }
};
