const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    investmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Investment', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userEmail: { type: String, required: true },
    content: { type: String, required: true },
});

module.exports = mongoose.model("Comment", commentSchema);
