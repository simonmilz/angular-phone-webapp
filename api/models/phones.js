const mongoose = require('mongoose');

const scheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    snippet: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('phoneModel', scheme)