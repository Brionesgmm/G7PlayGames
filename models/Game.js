const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  platforms: [
    {
      name: String,
      url: String,
      checked: Boolean,
    },
  ],
  links: [
    {
      name: String,
      url: String,
      checked: Boolean,
    },
  ],
  networks: [
    {
      name: String,
      checked: Boolean,
    },
  ],
  feedbackForm: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Game", GameSchema);
