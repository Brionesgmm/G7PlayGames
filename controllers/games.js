const cloudinary = require("../middleware/cloudinary");
const Game = require("../models/Game");

exports.getGames = async (req, res) => {
  try {
    const games = await Game.find().lean();
    res.json(games);
  } catch (err) {
    console.log(err);
  }
};

exports.createGame = async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    const game = await Game.create({
      title: req.body.title,
      image: result.secure_url,
      cloudinaryId: result.public_id,
      description: req.body.description,
      platforms: req.body.platforms,
      links: req.body.links,
      networks: req.body.networks,
      user: req.user.id,
    });
    console.log("Game has been added!");
    res.json({ game });
  } catch (err) {
    console.log(err);
  }
};
