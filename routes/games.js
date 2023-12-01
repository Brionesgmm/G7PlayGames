const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const gamesController = require("../controllers/games");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/getGames", gamesController.getGames);

router.post(
  "/createGame",
  ensureAuth,
  upload.single("file"),
  gamesController.createGame
);

router.put(
  "/updateGame/:id",
  ensureAuth,
  upload.single("file"),
  gamesController.updateGame
);

module.exports = router;
