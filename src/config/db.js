const mongoose = require("mongoose")
require("dotenv").config()
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI
    if (!uri) {
        throw new Error('MONGOURI environment variable not set')
    }
    await mongoose.connect(uri)
    console.log("MongoDB connected");
    await mongoose.connection.db.admin().ping();
    console.log("Pinged your deployment. You successfully connected to MongoDB!")
  } catch (err) {
    console.error("MongoDB connection error:", err.message)
    process.exit(1)
  }
}
module.exports = connectDB
