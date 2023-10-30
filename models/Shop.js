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
    coffees: {
        type: Schema.Types.ObjectId,
        ref: 'Coffee'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Shop = model('Shop', shopSchema);

module.exports = Shop;