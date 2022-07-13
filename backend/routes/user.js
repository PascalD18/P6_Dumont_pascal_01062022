const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const passwordValidation = require('../midleware/password-validator')
const max= require('../midleware/limiter')

router.post('/signup', passwordValidation,userCtrl.signup);
router.post('/login', passwordValidation,userCtrl.login);

module.exports = router;