const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);
