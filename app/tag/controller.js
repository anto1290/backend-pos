const Tag = require("./model");

const store = async (req, res, next) => {
    try {
        let payload = req.body;
        const tag = new Tag(payload);
        await tag.save();
        res.json(tag);
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
        const tag = await Tag.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
        res.json(tag);
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
        const tag = await Tag.findByIdAndDelete(id);
        res.json(tag);
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
        const tags = await Tag.find();
        res.json(tags);
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