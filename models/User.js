const mongoose = require('mongoose')
const { Schema } = mongoose;

const users = new Schema({
  username: {
    type: String,
    unique: true,
    match: [
      /^[a-z0-9_-]+$/,
      'Username must be lowercase, contain no spaces or emojis, and may include letters, numbers, underscores, and hyphens.']
  },
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  avatar: { type: String },
  cover: { type: String },
  password: { type: String },
  role: { type: String },
  skills: { type: String },
  isBlocked: { type: Boolean },
  isAdmin: { type: Boolean },
  socialLinks: {
    type: Object, default: {
      github: "",
      linkedin: "",
      facebook: "",
      instagram: "",
      twitter: ""
    }
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  blockedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],

}, { timestamps: true });



module.exports = mongoose.model("User", users);