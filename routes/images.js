const express = require('express');
const router = express.Router();
const imagesCtrl = require('../controllers/images');


router.post('/locations/:id/images', imagesCtrl.addImage);


module.exports = router;





