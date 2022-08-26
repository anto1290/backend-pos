const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    name: {
        type: String,
        minlength: [3, 'Nama produk minimal 3 karakter'],
        required: [true, 'Nama produk harus diisi']
    },
    price: {
        type: Number,
        required: [true, 'Harga produk harus diisi']
    },
    qty: {
        type: Number,
        min: [1, 'Qty minimal 1'],
        required: [true, 'Jumlah produk harus diisi']
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
}, { timestamps: true });

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
module.exports = OrderItem;