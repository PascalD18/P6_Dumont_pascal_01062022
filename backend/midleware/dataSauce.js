// Validation de la saisie du fabricant de sauce
module.exports.manufacturer = (req, res, next) => {
    if (req.body.sauce== undefined) {

        // Ne pas parser la requête lors d'une modification
        var sauceObject = req.body; 
    } else{

        // Pour une création, il faut parser la requéte ( pour obtenir le format json )
        var sauceObject = JSON.parse(req.body.sauce);  
    }
    let valideDataSauce = new RegExp(/^[a-z-A-Z]+$/);
    if (valideDataSauce.test(sauceObject.manufacturer)) {
        next();
    } else {
        // Reponse de l'erreur si la saisie contient des chiffres
        res.status(400).json({ message: `Ne saisir que des lettres pour le champs 'manufacturer'. ` });
    }
};