const Product = require('../product/model');
const CartItem = require('../cart-item/model');

const update = async (req, res, next) => {
    try {
        const { items } = req.body;
        const productIds = items.map(item => item.product._id);
        const products = await Product.find({ _id: { $in: productIds } });
        let cartItems = items.map(item => {
            let relatedProduct = products.find(product => product._id.toString() === item.product._id.toString());
            return {
                product: relatedProduct._id,
                price: relatedProduct.price,
                image_url: relatedProduct.image_url,
                name: relatedProduct.name,
                qty: item.qty,
                user: req.user._id
            }
        });
        await CartItem.deleteMany({ user: req.user._id });
        await CartItem.bulkWrite(cartItems.map(item => {
            return {
                updateOne: {
                    filter: {
                        user: req.user._id,
                        product: item.product
                    },
                    update: item,
                    upsert: true
                }
            }
        }));
        res.status(200).json(cartItems);
    } catch (error) {
        if (error && error.name === 'ValidationError') {
            res.status(400).json({
                error: 1,
                message: error.message,
                fields: error.errors
            });
        }
        next(error);
    }
}

const index = async (req, res, next) => {
    try {
        let items = await CartItem.find({ user: req.user._id }).populate('product');
        res.status(200).json(items);
    } catch (error) {
        if (error && error.name === 'ValidationError') {
            res.status(400).json({
                error: 1,
                message: error.message,
                fields: error.errors
            });
        }
        next(error);
    }
}

module.exports = {
    update,
    index
}