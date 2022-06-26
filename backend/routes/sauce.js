const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/stuff');
const auth = require('../midleware/auth')

router.post('/', auth,sauceCtrl.createThing);
router.put('/:id', auth,sauceCtrl.modifyThing);
router.delete('/:id', auth,sauceCtrl.deleteThing);
router.get('/:id',sauceCtrl.getOneThing);
router.get('/',sauceCtrl.getAllThings);

module.exports = router;