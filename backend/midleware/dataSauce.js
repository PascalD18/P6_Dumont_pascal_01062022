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
        res.status(401).json({ message: `Ne saisir que des lettres pour le champs 'manufacturer'. ` });
    }
};

module.exports.email = (req, res, next) => {
    const userObject = req.body;

    // Definition du regex pour l'email
    let valideDataEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    if (valideDataEmail.test(userObject.email)) {
        next();
    } else {
        res.status(401).json({ message: "Adresse email incorrecte !" });
    }
};