const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeliveryAddressSchema = new Schema({
    nama: {
        type: String,
        required: [true, 'Nama harus diisi'],
        maxlength: [255, 'Nama maksimal 255 karakter']
    },
    kelurahan: {
        type: String,
        required: [true, 'Kelurahan harus diisi'],
        maxlength: [255, 'Kelurahan maksimal 255 karakter']
    },
    kecamatan: {
        type: String,
        required: [true, 'Kecamatan harus diisi'],
        maxlength: [255, 'Kecamatan maksimal 255 karakter']
    },
    kabupaten: {
        type: String,
        required: [true, 'Kabupaten harus diisi'],
        maxlength: [255, 'Kabupaten maksimal 255 karakter']
    },
    provinsi: {
        type: String,
        required: [true, 'Provinsi harus diisi'],
        maxlength: [255, 'Provinsi maksimal 255 karakter']
    },
    detail: {
        type: String,
        required: [true, 'Detail harus diisi'],
        maxlength: [1000, 'Detail maksimal 1000 karakter']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true });

const DeliveryAddress = mongoose.model('DeliveryAddress', DeliveryAddressSchema);
module.exports = DeliveryAddress;