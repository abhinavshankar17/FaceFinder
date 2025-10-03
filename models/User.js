const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  embeddings: [[Number]], // multiple embeddings per user
});

module.exports = mongoose.model("User", userSchema);
