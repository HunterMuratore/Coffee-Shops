const router = require('express').Router();

const { User } = require('../models');

const { isLoggedIn, authenticate } = require('./helpers');


// Register
router.post('/register', isLoggedIn, async (req, res) => {
    try {
        const user = await User.create(req.body);

        req.session.user_id = user._id;

        res.json(user);
    } catch (err) {
        console.log(err.message);

        const code = err.code;
        const errors = [];

        if (code === 11000) {
            return res.status(403).send({
                message: 'That email address is already registered'
            });
        }

        for (let prop in err.errors) {
            const txt = err.errors[prop].message;

            errors.push(txt);
        }

        res.status(403).send({
            message: 'Authentication error',
            errors
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

    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: err.message
        });
    }
});

// Is Authenticated - this will send the user if they are logged in otherwise send null
// Can be used to send a user view if they are logged in or a guest view if they are not
router.get('/authenticate', authenticate, (req, res) => {
    res.json(req.user);
});

// Log Out
router.get('/logout', (req, res) => {
    req.session.destroy();

    res.json({ message: 'Logged out successfully' });
});

module.exports = router;