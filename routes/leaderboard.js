const express = require("express");
const router = express.Router();
const leaderboardController = require("../controllers/leaderboard");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/getLeaderboard", leaderboardController.getLeaderboard);

router.put(
  "/updateLeaderboard",
  ensureAuth,
  leaderboardController.updateLeaderboard
);

module.exports = router;
