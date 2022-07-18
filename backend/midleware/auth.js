const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        // Décode le token alloué à l'utilisateur
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
        const userId = decodedToken.userId;

        //Vérifie l'authentification
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée!' });
    }
};