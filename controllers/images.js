// image mmodel that can talk to the database

const Location = require('../models/location');

module.exports = { 
    addImage,
    delete: deleteImage,
    editImage,
    updateImage,
    
}
function updateImage(req, res) {
    Location.findOne({'images._id': req.params.id}, function(err, locationDoc) {
        const imageSubdoc = locationDoc.images.id(req.params.id);
        if (!imageSubdoc.user.equals(req.user._id)) return res.redirect(`/locations${locationDoc._id}`);
        imageSubdoc.description = req.body.description;
        locationDoc.save(function(err) {
                res.redirect(`/locations/${locationDoc._id}`);
        });
    });
}

function editImage(req, res) {
    Location.findOne({'images._id': req.params.id}, function(err, locationDoc) {
        const image = locationDoc.images.id(req.params.id);
        res.render('images/edit', {image});
    });
}




function deleteImage(req, res, next) {
    Location.findOne({'images._id': req.params.id}, function(err, locationDoc){   
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        const image = locationDoc.images.id(req.params.id);
        // if the image wasnt uploaded by the user redirect them back to the same pg
        if(!image.user.equals(req.user.id)) return res.redirect(`/locations/${locationDoc._id}`);
        // remove image
        image.remove();
        locationDoc.save(function(err) {
            if(err) next(err); 
            res.redirect(`/locations/${locationDoc._id}`);
        });
    });
}

function addImage(req,res) {
    console.log(req.file)
    console.log(req.body.description)
    console.log(req.user.name)
    Location.findById(req.params.id, function(err, locationdb) {  //id of movie we eant to add the review to
        locationdb.images.push({
            imageUrl: req.file.filename,
            description: req.body.description,
            userName: req.user.name,
            user: req.user._id
        });
        locationdb.save(function(err) {
            res.redirect(`/locations/${locationdb._id}`);
        });
    });
}



















// function addImage(req,res) {
//     console.log(req.file.originalname);
//     Location.findById(req.params.id, function(err, locationdb) {  //id of location we want to add a image to
//         req.body.user = req.user._id;
//         req.body.userName = req.user.name;
//         req.body.userAvatar = req.user.avatar;
//         locationdb.images.push({
//             imageUrl: "random test",
//             description: req.body.description,
//             user: req.body.userName
//         });  // content of the form (the image we want to upload to the location)
//         locationdb.save(function(err) {
//             res.redirect(`/locations/${locationdb._id}`);
//         });
//     });
// }


