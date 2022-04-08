const express = require('express');
const router = express.Router();
const locationsCtrl = require('../controllers/locations');
const isLoggedIn = require('../config/auth') //add to new route

router.get('/', locationsCtrl.index);

// router.post('/', locationsCtrl.create);  // export create and make funtion





module.exports = router;