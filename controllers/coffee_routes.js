const router = require('express').Router();

const { Coffee } = require('../models');

const { isAuthenticated } = require('./helpers');

// Get All Coffees
router.get('/coffees', async (req, res) => {
    const coffees = await Coffee.find();

    res.json(coffees);
});

// Create Coffee
router.post('/coffees', isAuthenticated, async (req, res) => {
    try {
        const coffee = await Coffee.create(req.body);

        res.json(coffee);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;