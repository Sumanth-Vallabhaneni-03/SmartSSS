const mongoose = require("mongoose");

const MentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  subjects: { type: String, required: true },
  charge: { type: Number, required: true },
  number: { type: String, required: true }

});

const MentorModel = mongoose.model("mentors", MentorSchema);
module.exports = MentorModel;
