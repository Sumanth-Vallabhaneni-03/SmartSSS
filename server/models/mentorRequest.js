const mongoose = require("mongoose");

const MentorRequestSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "Mentors", required: true },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MentorRequest", MentorRequestSchema);
