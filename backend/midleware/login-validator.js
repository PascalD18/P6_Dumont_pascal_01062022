const passwordValidator = require('password-validator');
const validatorData = require('validator')

//Création du shéma de saisie de l'email
const emailSchema = new passwordValidator()

    //Définition du Shémas de validation 
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
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .not(/[/%]/);

// Module de validation du mot de passe
module.exports.password = (req, res, next) => {

    console.log(passwordSchema.validate('joke', { details: true }))

    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
        return res.status(400).json({
            message: `Le mot de passe doit avoir les caractéristiques suivantes :
           - 8 caractéres minimum 
           - 2 Majuscules
           - 2 minuscules
           - Ne doit pas contenir un des caracteres spéciaux suivants : / %`
        });
    }
};
