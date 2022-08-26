const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    name: {
        type: String,
        minlength: [5, 'Nama produk minimal 5 karakter'],
        required: [true, 'Nama produk harus diisi']
    },
    qty: {
        type: Number,
        required: [true, 'Qty harus diisi'],
        min: [1, 'Jumlah produk minimal 1']
    },
    price: {
        type: Number,
        required: [true, 'Harga produk harus diisi'],
        default: 0
    },
    image_url: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
}, { timestamps: true });

const CartItem = mongoose.model('CartItem', cartItemSchema);
module.exports = CartItem;
