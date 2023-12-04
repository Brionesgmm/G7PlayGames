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
    console.log(req.body);
    const platformsData = JSON.parse(req.body.platforms);
    const linksData = JSON.parse(req.body.links);
    const networksData = JSON.parse(req.body.networks);

    // Create a new game with the parsed data
    const game = await Game.create({
      title: req.body.title,
      image: result.secure_url,
      cloudinaryId: result.public_id,
      description: req.body.description,
      feedbackForm: req.body.feedbackUrl,
      platforms: platformsData, // Use the parsed data
      links: linksData,
      networks: networksData,
      user: req.user.id,
    });
    console.log("Game has been added!");
    res.json({ game });
  } catch (err) {
    console.log(err);
  }
};

exports.updateGame = async (req, res) => {
  try {
    let image, cloudinaryId;

    // Only upload image if a file is provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      image = result.secure_url;
      cloudinaryId = result.public_id;
    }

    console.log(req.body);
    const platformsData = JSON.parse(req.body.platforms);
    const linksData = JSON.parse(req.body.links);
    const networksData = JSON.parse(req.body.networks);

    // Create a new game with the parsed data
    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      platforms: platformsData,
      links: linksData,
      networks: networksData,
      feedbackForm: req.body.feedbackForm,
      user: req.user.id,
    };

    // Add image data only if a new image has been uploaded
    if (image && cloudinaryId) {
      updatedData.image = image;
      updatedData.cloudinaryId = cloudinaryId;
    }

    const updatedGames = await Game.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );

    if (updatedGames) {
      res.json(updatedGames);
    } else {
      res.status(404).json({ error: "Game not found" });
    }
    console.log("Game has been updated!");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};
