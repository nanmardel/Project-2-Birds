const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/auth') //add to routes that are only for users that are loggedIn
const imagesCtrl = require('../controllers/images');
const updatesCtrl = require('../controllers/images');


router.post('/locations/:id/images', isLoggedIn, imagesCtrl.addImage);

router.delete('/images/:id', isLoggedIn, imagesCtrl.delete);

router.get('/images/:id/edit', isLoggedIn, imagesCtrl.editImage);

router.put('/images/:id', isLoggedIn,updatesCtrl.updateImage);

module.exports = router;





