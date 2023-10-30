const router = require('express').Router();

const shop_routes = require('./shop_routes');
const coffee_routes = require('./coffee_routes');

const user_routes = require('./user_routes');

router.use('/api', shop_routes, coffee_routes);

router.use('/auth', user_routes);

module.exports = router;
