const { connect, Schema, model } = require('mongoose'); // Deconstruct the mongoose object

const PORT = process.env.port || 3333;

connect('mongodb://127.0.0.1:27017/coffee_shop_db'); // the last part of the connection url is the database name you want to use or create

const shopSchema = new Schema({
    name: String,
    location: String,
    is_chain: Boolean
});

const Shop = model('Shop', shopSchema);

// Shop.create({
//     name: 'Coffee Now',
//     location: 'Somerville',
//     is_chain: true
// }).then(new_shop => {
//     console.log(new_shop)
// });

// Shop.find()
//     .then(shops => console.log(shops));


// Shop.findById('653a89f367639dd8eb0c571f')
//     .then(shop => console.log(shop));

// Shop.insertMany([
//     {
//         name: 'Coffee Now',
//         location: 'Somerville',
//         is_chain: true
//     },
//     {
//         name: 'Dunkin',
//         location: 'Branchburg',
//         is_chain: true
//     },
//     {
//         name: 'Cafe Mez',
//         location: 'Bridgewater',
//         is_chain: true
//     }])

// Shop.findByIdAndUpdate('653a89f367639dd8eb0c571f', {
//     name: 'Starbucks'
// }, {
//     new: true // This returns the new db object (don't always want this bc you may still need the old one to compare or something)
// }).then(shop => console.log(shop));

// Shop.findByIdAndDelete('653a961a9adb78726be60cc8')
//     .then(result => console.log('shop deleted'));