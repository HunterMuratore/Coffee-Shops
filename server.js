const PORT = process.env.port || 3333;

const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017'; // Might have to use 127.0.0.1 instead of localhost 
const client = new MongoClient(url);

const db_name = 'fruits_db';

client.connect()
    .then(() => {
        // Select the db you are working with
        const db = client.db(db_name);

        // Select the db collection object you are working with
        const fruits = db.collection('fruits');

        // fruits.insertOne({
        //     name: 'apple'
        // }).then((result) => {
        //     console.log(result);
        // });

        // fruits.find({}).toArray()
        //     .then((result) => {
        //         console.log(result);
        //     });

        // fruits.updateOne({
        //     _id: new ObjectId('653a7b97166114711e0e24c4')
        // }, {
        //     $set: {
        //         name: 'banana'
        //     }
        // });

        // fruits.findOneAndUpdate({
        //     _id: new ObjectId('653a7b97166114711e0e24c4')
        // }, {
        //     $set: {
        //         name: 'banana'
        //     }
        // }).then((result) => {
        //     console.log(result);
        // });

        // fruits.insertMany([{
        //     name: 'orange'
        // },
        // {
        //     name: 'watermelon'
        // },
        // {
        //     name: 'strawberry'
        // },
        // {
        //     name: 'starfruit'
        // }]).then((result) => {
        //     console.log('Insert complete');
        // });

        // fruits.deleteOne({
        //     _id: new ObjectId('653a7b97166114711e0e24c4')
        // }).then((result) => {
        //     console.log('deleted fruit');
        // });

        /* Insert an array of shops to the collection */
        /* Insert one shop object to the fruit collection */
        fruits.insertOne({
            shop_name: 'Wegmans'
        }).then((result) => {
            console.log(result);
        });

        fruits.find()
            // .skip(1)
            // .limit(1)
            .sort({name: 1}) // Sort by name in ascending order (-1 for descending)
            .toArray()
            .then(fruits => console.log(fruits));
    });
