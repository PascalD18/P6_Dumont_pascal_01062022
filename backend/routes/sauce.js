const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');
const auth = require('../midleware/auth')

router.post('/',auth,sauceCtrl.createThing);
router.put('/:id',auth,sauceCtrl.modifyThing);
router.delete('/:id',auth,sauceCtrl.deleteThing);
router.get('/:id',auth,sauceCtrl.getOneThing);
router.get('/',sauceCtrl.getAllThings);

module.exports = router;