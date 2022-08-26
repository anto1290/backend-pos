const router = require('express').Router();
const { checkPermission } = require('../../middlewares');
const DeliveryAddressController = require('./controller');


router.route('/delivery-addresses')
    .get(checkPermission('view', 'DeliveryAddress'), DeliveryAddressController.index)
    .post(checkPermission('create', 'DeliveryAddress'), DeliveryAddressController.store);
router.route('/delivery-addresses/:id')
    .put(DeliveryAddressController.update)
    .delete(DeliveryAddressController.destroy);

module.exports = router;