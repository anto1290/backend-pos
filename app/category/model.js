const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [20, "Name must be less than 50 characters long"],
        required: true
    }
});

module.exports = mongoose.model("Category", categorySchema);