require("dotenv").config({ path: __dirname + "/../config/.env" });
const mongoose = require("mongoose");
const Leaderboard = require("../models/Leaderboard"); // Ensure this path is correct
const connectDB = require("../config/database"); // Import the connectDB function

connectDB(); // Call the function to connect to the database

// Assuming you want to create a single Leaderboard document
// You might want to adjust the 'users' array as per your requirements
const newLeaderboard = new Leaderboard({
  users: [
    { username: "user1", score: 100 },
    { username: "user2", score: 150 },
    // Add more users as needed
  ],
});

newLeaderboard.save((err) => {
  if (err) {
    console.error("Error saving leaderboard:", err);
  } else {
    console.log("Leaderboard created successfully");
  }
});
