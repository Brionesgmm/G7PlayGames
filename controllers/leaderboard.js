const Leaderboard = require("../models/Leaderboard");

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.findOne().lean();

    if (leaderboard) {
      res.json(leaderboard);
    } else {
      res.status(404).json({ message: "Leaderboard not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateLeaderboard = async (req, res) => {
  try {
    const updatedData = {
      users: req.body.users,
    };
    const leaderboard = await Leaderboard.findOne().lean();

    if (leaderboard) {
      const updatedLeaderboard = await Leaderboard.findByIdAndUpdate(
        leaderboard._id,
        { $set: updatedData },
        { new: true }
      );
      res.json(updatedLeaderboard);
    } else {
      res.status(404).json({ error: "Leaderboard not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
