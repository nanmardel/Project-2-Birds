const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/auth') //add to routes that are only for users that are loggedIn
const imagesCtrl = require('../controllers/images');
const updatesCtrl = require('../controllers/images');
const multer = require('multer')


const storage = multer.diskStorage({
    destination:function(request, file, cb){
        cb(null, './public/images'); // this is where images are going to be stored
    },

    filename:function(request, file, cb){
        cb(null, Date.now() + file.originalname) // this helps give files original names
    }
});

// with this upload you can  use the storage above and limit the file size
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024*10124*3,
    }
})

router.post('/locations/:id/images', upload.single('imageUrl'), isLoggedIn, imagesCtrl.addImage);

router.delete('/images/:id', isLoggedIn, imagesCtrl.delete);

router.get('/images/:id/edit', isLoggedIn, imagesCtrl.editImage);

router.put('/images/:id', isLoggedIn,updatesCtrl.updateImage);

module.exports = router;





