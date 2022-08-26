const router = require('express').Router();
const { checkPermission } = require('../../middlewares');
const cartItemController = require('./controller');

router.route('/carts')
    .put(checkPermission('update', 'Cart'), cartItemController.update)
    .get(checkPermission('read', 'Cart'), cartItemController.index);

module.exports = router;