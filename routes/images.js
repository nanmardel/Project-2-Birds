const express = require('express');
const router = express.Router();
const imagesCtrl = require('../controllers/images');

router.post('locations/:id/images', imagesCtrl.addImage);


router.get('/', async function (req, res){
    await res.render('index');
});

module.exports = router