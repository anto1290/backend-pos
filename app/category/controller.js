const Category = require("./model");

const store = async (req, res, next) => {
    try {
        let payload = req.body;
        const category = new Category(payload);
        await category.save();
        res.json(category);
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
        let payload = req.body;
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
        res.json(category);
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
        const category = await Category.findByIdAndDelete(id);
        res.json(category);
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
        const categories = await Category.find();
        res.json(categories);
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