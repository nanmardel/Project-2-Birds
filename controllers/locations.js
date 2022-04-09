const Location = require("../models/location");


module.exports = {
    index,
    new: newlocation,
    create,
    show
}


function index(req, res) {
    console.log(req.user, '<- req.user')
    Location.find({}, function(err, locations){
        res.render('locations/index',{
            locations,
            title: "All Locations"
        });
    });
}

function newlocation(req, res) {
    res.render('locations/new', {title: 'Add Location'});

}

function create(req, res) {
    const location = new Location(req.body);
    location.save(function (err){
        console.log(err, 'create error');
        if(err) return res.redirect('/locations/new');
        console.log(location);
        res.redirect('/locations/new')
});
}

function show(req, res) {
    Location.findById(req.params.id, function(err, location) {
    res.render('locations/show', {title: 'Locations Detail', location});
    
});
}