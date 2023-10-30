const router = require('express').Router();

const { User } = require('../models');

const { isLoggedIn } = require('./helpers');


// Register
router.post('/register', isLoggedIn, async (req, res) => {
    try {
        const user = await User.create(req.body);

        req.session.user_id = user._id;

        res.json(user);
    } catch(err) {
        console.log(err.message);
        res.status(401).send({
            message: err.message
        });
    }
});

// Login
router.post('/login', isLoggedIn, async (req, res) => {
    const { login, password } = req.body;

    // Allow the user to sign in using either their username or password
    try {
        let user;

        const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(login);

        if (isEmail) {
            user = await User.findOne({ email: login });
        } else {
            user = await User.findOne({ username: login });
        }

        if (!user) {
            return res.status(403).json({ message: 'User not found.' });
        }

        const is_valid = await user.validatePass(password);

        if (!is_valid) {
            return res.status(401).json({ message: 'Incorrect password.' });
        }

        req.session.user_id = user._id;

        res.send(user);

    } catch(err) {
        console.log(err.message);
        res.status(401).send({
            message: err.message
        });
    }
});

// Is Authenticated

// Log Out

module.exports = router;