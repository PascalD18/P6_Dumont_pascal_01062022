const fs = require('fs');

// Récupération et vérification de la saisie 'manufacturer'
module.exports = (req, res, next) => {

    // 1) Récupération de 'manufacturer' selon le type de requête
    if (req.body.manufacturer == undefined) {

        // Dans le cas de la création d'une sause (Méthode POST et accés /api/sauses/)
        // => Conversion de la requete en objet json 'sauce'
        const sauce = JSON.parse(req.body.sauce);
        manufacturer = sauce.manufacturer;
        created = true;
    } else {

        // Dans le cas d'une modification d'une sauce ( Méthode PUT et accés /api/sauces/:id)
        // => La requête est déjà sous format json
        manufacturer = req.body.manufacturer;
        created = false;
    }

    // 2) Vérification de la saisie de 'manufacturer'
    let validEnter = new RegExp(/^[a-z-A-Z]+$/);// N'accepte que les lettres
    messErr = `Ne saisir que des lettres pour le champs 'manufacturer'. `
    if (validEnter.test(manufacturer)) {

        //Si saisie correcte => Continue de traiter la création ou la modifictation de la sauce
        next();
    } else if (created) {

        // En mode création avec saisie incorrecte => Efface le fichier préenregistré
        filename = req.file.filename
        fs.unlink(`images/${filename}`, () => { })

        //puis, réponse de l'erreur
        return res.status(400).json({ message: `${messErr}` });
    } else {

        //En mode modification avec saisie correcte => Reponse de l'erreur
        return res.status(400).json({ message: `${messErr}` });
    }
};
