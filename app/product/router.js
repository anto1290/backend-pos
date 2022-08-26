const router = require('express').Router();
const multer = require('multer');
const os = require('os');
const { checkPermission } = require('../../middlewares');

const productController = require('./controller');

router.get('/products', productController.index);
router.post('/products', multer({ dest: os.tmpdir() }).single('image'), checkPermission('create', 'Product'), productController.store);
router.route('/products/:id')
    .get(productController.getOne)
    .put(multer({ dest: os.tmpdir() }).single('image'), checkPermission('update', 'Product'), productController.update)
    .delete(checkPermission('delete', 'Product'), productController.destroy);

module.exports = router;