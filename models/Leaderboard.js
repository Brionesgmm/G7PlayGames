const mongoose = require("mongoose");

const LeaderboardSchema = new mongoose.Schema({
  users: [
    {
      username: String,
      score: Number,
      id: String,
      _id: false,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Leaderboard", LeaderboardSchema);
