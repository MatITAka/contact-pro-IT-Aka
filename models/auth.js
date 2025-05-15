const mongoose = require("mongoose");

const userAuthSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, });

module.exports = mongoose.model('UserAuth', userAuthSchema);