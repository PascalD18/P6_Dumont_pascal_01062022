const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const loginValidator = require('../midleware/login-validator')
const max = require('../midleware/limiter')


router.post('/signup', loginValidator.email, loginValidator.password, userCtrl.signup);
router.post('/login', max.limiter, loginValidator.email, userCtrl.login);

module.exports = router;