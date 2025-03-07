const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  subjectsInterested: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: null },
  notifications: [
    {
      message: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const UsersModel = mongoose.model("users", usersSchema);
module.exports = UsersModel; // ✅ Exporting the updated model
