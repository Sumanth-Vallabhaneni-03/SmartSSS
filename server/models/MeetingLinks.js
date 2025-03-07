const mongoose = require("mongoose");

const meetingLinksSchema = new mongoose.Schema({
  mentorId: { type: String, required: true },
  userId: { type: String, required: true },
  meetingCode: { type: String, required: true },
});

const MeetingLinks = mongoose.model("MeetingLinks", meetingLinksSchema);

module.exports = MeetingLinks;
