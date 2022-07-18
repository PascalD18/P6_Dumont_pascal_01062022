const rateLimit = require("express-rate-limit");

// Définition de la limitation aux nombre de tentatives de login, par utilisateur
const limiter = rateLimit({
   windowMs: 2 * 60 * 1000, // Bloque l'utilsateur concerné pendant 2 mn
   max: 3, // 3 tentatives maximum avnt le blocage du compte
   message: "Trop de tentatives de connexion. Compte bloqué pour 2 minutes",

   // Active la limitation en fonction de l'email utilisateur
   keyGenerator: function (req) {
      return req.body.email;
   }
});

module.exports = { limiter }

