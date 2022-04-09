const express = require('express');
const router = express.Router();
const locationsCtrl = require('../controllers/locations');
const isLoggedIn = require('../config/auth') //add to new route

router.get('/', locationsCtrl.index);

router.get('/new', isLoggedIn, locationsCtrl.new);

router.post('/', locationsCtrl.create);  

router.get('/:id', locationsCtrl.show);



module.exports = router;