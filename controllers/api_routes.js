const router = require('express').Router();
const Shop = require('../models/Shop');

router.get('/shops', async (req, res) => {
    const shops = await Shop.find()
    res.json(shops);
});

router.post('/shops', async (req, res) => {
    try {
        await Shop.create(req.body)
        res.send({ message: 'Shop added to the db'});
    } catch (err) {
        console.log(err);
        res.status(500).send({"error": err.message});
    }
});

router.put('/shop/:shop_id', async (req, res) => {
    const shop_id = req.params.shop_id;
    const { name, strength } = req.body;

    try {
        const updated_shop = await Shop.findByIdAndUpdate(shop_id, {
            $push: {
                coffees: {
                    name,
                    strength
                }
            }
        }, {
            new: true // This will return the newly updated shop object
        });

        res.send(updated_shop);
    } catch (err) {
        console.log(err);
        res.status(500).send({"error": err.message});
    }
});

module.exports = router;