const express = require('express');
const sauceCtrl = require('../controllers/sauce');
const auth = require('../midleware/auth')
const multer = require('../midleware/multer-config')
const validEnterForm = require('../midleware/validEnterForm')

const router = express.Router();

router.post('/', auth,multer,validEnterForm,sauceCtrl.createSauce);
router.put('/:id', auth, multer,validEnterForm,sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/:id/like', auth, sauceCtrl.likedNoLiked);

module.exports = router;