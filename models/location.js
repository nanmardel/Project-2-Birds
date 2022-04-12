const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    imageUrl: {
        type: String,
    },
    description: {
        type: String,
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'}, // refererncing the user document
    userName: String, 
    userAvatar: String
}, {
    timestamps: true
});

const locationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
    },
    state: {
        type: String
    }, 
    images:[imageSchema]
    
});





module.exports = mongoose.model('Location',locationSchema);