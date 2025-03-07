const mongoose = require("mongoose");

const MentorSchema = new mongoose.Schema({
  name: String,
  subjects: String,
  number: String,
  charge: Number,
  image: String,
  requests: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Ensure this is stored as ObjectId
      name: String,
      email: String,
      number: String,
      status: { type: String, default: "Pending" },
    },
  ],  
});

const Mentor = mongoose.model("Mentor", MentorSchema);
module.exports = Mentor;
