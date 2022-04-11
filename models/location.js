const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    }
});

const imageSchema = new Schema({
    image: {
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



module.exports = mongoose.model('Location',locationSchema);