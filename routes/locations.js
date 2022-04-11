const express = require('express');
const router = express.Router();
const locationsCtrl = require('../controllers/locations');
const isLoggedIn = require('../config/auth') //add to routes that are only for users that are loggedIn

router.get('/', locationsCtrl.index);

router.get('/new', isLoggedIn, locationsCtrl.new);

router.post('/', isLoggedIn, locationsCtrl.create);  

router.get('/:id', isLoggedIn, locationsCtrl.show);



module.exports = router;