const mongoose = require('mongoose')
const { Schema } = mongoose;

const postSchema = new Schema({
  caption: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  isBlocked: { type: Boolean },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  attachments: {
    type: Array
  },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });


module.exports = mongoose.model("Post", postSchema);