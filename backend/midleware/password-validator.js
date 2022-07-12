const passwordValidator = require('password-validator');

//Création du shemas de validation du mot de passe
passwordSchema = new passwordValidator();

// Définition du shemas que doit respecter le mot de passe
passwordSchema
    .is().min(8)

module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
        return res.status(400).json({
            message: `Le mot de passe doit avoir les caractéristiques suivantes :
           - 8 caractéres minimum `
        });
    }

};
