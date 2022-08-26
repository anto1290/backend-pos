const { subject } = require('@casl/ability');
const { policyFor } = require('../../utils');
const Invoice = require('./model');

const show = async (req, res, next) => {
    try {
        let { order_id } = req.params;
        let invoice = await Invoice.findOne({ order: order_id }).populate('order').populate('user');
        let policy = policyFor(req.user);
        let subjectInovice = subject('Invoice', { ...invoice, user_id: invoice.user._id });
        if (!policy.can('read', subjectInovice)) {
            return res.status(403).json({
                error: 1,
                message: 'You are not authorized to view this invoice'
            });
        }
        return res.status(200).json(invoice);
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
    show
}