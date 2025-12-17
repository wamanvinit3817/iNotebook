const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/inotebook";

async function connectToMongo() {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connection Successful");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
} 
module.exports = connectToMongo;  