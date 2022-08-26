const { subject } = require('@casl/ability');
const { policyFor } = require('../../utils');
const DeliveryAddress = require('./model');

const store = async (req, res, next) => {
    try {
        const payload = req.body;
        let user = req.user;
        let address = new DeliveryAddress({ ...payload, user: user._id });
        await address.save();
        res.status(201).json({
            message: 'Alamat berhasil ditambahkan',
            data: address
        });
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
const update = async (req, res, next) => {
    try {
        let { _id, ...payload } = req.body;
        const { id } = req.params;
        const deliveryAddress = await DeliveryAddress.findById(id);
        const subjectAddress = subject(DeliveryAddress, { ...deliveryAddress, user_id: deliveryAddress.user });
        let policy = policyFor(req.user);
        if (!policy.can('update', subjectAddress)) {
            res.status(403).json({
                error: 1,
                message: 'Anda tidak memiliki akses untuk mengubah data ini'
            });
        }
        deliveryAddress = await DeliveryAddress.findByIdAndUpdate(id, payload, { new: true });
        res.json(deliveryAddress);
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

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deliveryAddress = await DeliveryAddress.findById(id);
        const subjectAddress = subject(DeliveryAddress, { ...deliveryAddress, user_id: deliveryAddress.user });
        let policy = policyFor(req.user);
        if (!policy.can('delete', subjectAddress)) {
            res.status(403).json({
                error: 1,
                message: 'Anda tidak memiliki akses untuk menghapus data ini'
            });
        }
        deliveryAddress = await DeliveryAddress.findByIdAndDelete(id);
        res.json(deliveryAddress);
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
        let { skip = 0, limit = 10 } = req.query;
        let count = await DeliveryAddress.find({ user: req.user._id }).countDocuments();
        let deliveryAddress = await DeliveryAddress.find({ user: req.user._id })
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });
        res.json({ data: deliveryAddress, count: count });
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
    store,
    update,
    destroy,
    index
}