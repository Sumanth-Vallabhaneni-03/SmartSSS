const mongoose = require("mongoose");

const MentorSchema = new mongoose.Schema({
  name: String,
  subjects: String,
  number: String,
  charge: Number,
  image: String,
  requests: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      name: String,
      email: String,
      phone: String,
      status: { type: String, default: "Pending" }, // New field: "Pending" or "Accepted"
    },
  ],
});

const Mentor = mongoose.model("Mentor", MentorSchema);
module.exports = Mentor;
