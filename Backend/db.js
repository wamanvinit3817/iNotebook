const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

async function connectToMongo() {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connection Successful");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}  
module.exports = connectToMongo;   