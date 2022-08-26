const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        minlength: [3, 'Name must be at least 3 characters long'],
        required: [true, 'Name is required']
    },
    price: {
        type: Number,
        default: 0,
        min: [0, 'Price must be at least 0'],
    },
    description: {
        type: String,
        maxlength: [1000, 'Description must be at most 100 characters long'],
    },
    image_url: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag',
    }],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);