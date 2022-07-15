const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
   windowMs: 2 * 60 * 1000,
   max: 3,
   message: "Trop de tentatives de connexion. Compte bloqué pour 1 minute",
   keyGenerator: function (req) {
      return req.body.email;
   }
});

module.exports = { limiter }

