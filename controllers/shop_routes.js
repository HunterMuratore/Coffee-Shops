const router = require('express').Router();
const { Shop } = require('../models');
const { isAuthenticated, authenticate } = require('./helpers');

router.get('/shops', async (req, res) => {
    const shops = await Shop.find()
    res.json(shops);
});

// Create a Shop
router.post('/shops', isAuthenticated, authenticate, async (req, res) => {
    try {
        const newShop = await Shop.create({
            ...req.body,
            user: req.user._id
        });

        req.user.shops.push(newShop._id);
        req.user.save();

        res.send({ message: 'Shop added to the db', newShop });
    } catch (err) {
        console.log(err);
        res.status(500).send({"error": err.message});
    }
});

// Update a shop

// Add coffee to shop
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