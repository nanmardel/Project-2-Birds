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

module.exports = mongoose.model('Location',locationSchema);