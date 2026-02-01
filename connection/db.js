const mongoose = require("mongoose");

const connectDB = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;