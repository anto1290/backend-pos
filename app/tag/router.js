const router = require('express').Router();
const { checkPermission } = require('../../middlewares');
const CategoryController = require('./controller');


router.route('/tags').get(CategoryController.index).post(checkPermission('create', 'Tag'), CategoryController.store);
router.route('/tags/:id').put(checkPermission('update', 'Tag'), CategoryController.update).delete(checkPermission('delete', 'Tag'), CategoryController.destroy);

module.exports = router;
