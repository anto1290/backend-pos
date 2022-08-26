const router = require('express').Router();
const { checkPermission } = require('../../middlewares');
const CategoryController = require('./controller');


router.route('/categories').get(CategoryController.index).post(checkPermission('create', 'Category'), CategoryController.store);
router.route('/categories/:id').put(checkPermission('update', 'Category'), CategoryController.update).delete(checkPermission('delete', 'Category'), CategoryController.destroy);

module.exports = router;
