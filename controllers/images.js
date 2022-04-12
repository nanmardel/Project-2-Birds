// image mmodel that can talk to the database

const Location = require('../models/location');

module.exports = { 
    addImage,
}

function addImage(req,res) {
    Location.findById(req.params.id, function(err, locationdb) {  //id of movie we eant to add the review to
        locationdb.images.push(req.body);  // content of the form (the image we want to upload to the location)
        locationdb.save(function(err) {
            console.log(locationdb)
            res.redirect(`/locations/${locationdb._id}`);
        });
    });
}