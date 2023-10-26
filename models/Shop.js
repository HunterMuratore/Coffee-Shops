const { Schema, model } = require('mongoose');

const shopSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    is_chain: {
        type: Boolean,
        default: true
    },
    coffees: [{
        name: {
            type: String,
            required: true
        },
        strength: {
            type: String,
            required: true
        }
    }]
});

const Shop = model('Shop', shopSchema);

module.exports = Shop;