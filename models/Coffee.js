const { Schema, model } = require('mongoose');

const coffeeSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    strength: {
        type: String, 
        required: true
    }
});

const Coffee = model('Coffee', coffeeSchema);

module.exports = Coffee;