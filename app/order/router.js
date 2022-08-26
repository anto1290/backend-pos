const router = require('express').Router();
const { checkPermission } = require('../../middlewares');
const orderController = require('./controller');

router.route('/orders')
    .get(checkPermission('view', 'Order'), orderController.index)
    .post(checkPermission('create', 'Order'), orderController.store);


module.exports = router;