// image mmodel that can talk to the database

const Location = require('../models/location');

module.exports = { 
    addImage,
    delete: deleteImage,
    updateImage,
}


function updateImage(req, res, next) {
    Location.findOne({'images._id' : req.params.id}, function(err, locationDoc) {
        const image = locationDoc.images.id(req.params.id);
        if(!image.user.equals(req.user.id)) return res.redirect(`/locations/${locationDoc._id}`);
        image.update();
        locationDoc.save(function(err) {
            if (err) next(err);
            res.redirect(`/locations/${locationsDoc._id}`);
        })
    })
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
            res.redirect(`/locations/${locationsDoc._id}`);
        });
    });
}



function addImage(req,res) {
    Location.findById(req.params.id, function(err, locationdb) {  //id of movie we eant to add the review to
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        locationdb.images.push(req.body);  // content of the form (the image we want to upload to the location)
        locationdb.save(function(err) {
            console.log(locationdb)
            res.redirect(`/locations/${locationdb._id}`);
        });
    });
}


