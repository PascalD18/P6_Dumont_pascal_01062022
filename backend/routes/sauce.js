const express = require('express');
const sauceCtrl = require('../controllers/sauce');
const auth = require('../midleware/auth')
const multer = require('../midleware/multer-config')

const router = express.Router();

router.post('/', auth, multer,sauceCtrl.createSauce);
router.put('/:id', auth,multer,sauceCtrl.modifySauce);

router.delete('/:id', auth,sauceCtrl.deleteSauce);
router.get('/:id', auth,sauceCtrl.getOneSauce);
router.get('/', auth,sauceCtrl.getAllSauces);

//router.post('/:id/like', auth,sauceCtrl.createSauce);
//router.put('/:id/like', auth,sauceCtrl.modifySauce);

module.exports = router;