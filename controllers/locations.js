const Location = require("../models/location");


module.exports = {
    index,
}


function index(req, res){
    console.log(req.user, '<- req.user')
    Location.find({}, function(err, locations){
        res.render('locations/index',{
            locations,
            title: "All Locations"
        });
    });
}