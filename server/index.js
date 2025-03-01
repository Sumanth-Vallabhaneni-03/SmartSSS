require("dotenv").config();
const bcrypt = require("bcryptjs");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const UsersModel = require("./models/users");
const Mentor = require("./models/mentors");

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

mongoose.connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Database Error:", err));

// ✅ LOGIN ROUTE
app.post("/login", async (req, res) => {  // 🔥 Corrected API route
  try {
    const { email, password } = req.body;
    const user = await UsersModel.findOne({ email });

    if (!user) return res.status(404).json({ error: "User doesn't exist, please register!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.json({ message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ REGISTER ROUTE
app.post("/", async (req, res) => {  // 🔥 Changed from `/` to `/register`
  try {
    const { password, ...otherDetails } = req.body;
    if (!password) return res.status(400).json({ error: "Password is required" });

    const hash_password = await bcrypt.hash(password, 10);
    const user = await UsersModel.create({ ...otherDetails, password: hash_password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.json({ user, token });
  } catch (err) {
    return res.status(500).json({ error: "Failed to register user" });
  }
});

// ✅ FETCH MENTORS
app.get("/mentors", async (req, res) => {
  try {
    const mentors = await Mentor.find();
    return res.json(mentors);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});
app.post("/request-mentor/:mentorId", async (req, res) => {
  const { mentorId } = req.params;
  const { userId, name, email, phone } = req.body;

  try {
    // 1️⃣ Find mentor in database
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    // 2️⃣ Ensure requests field exists
    if (!mentor.requests) {
      mentor.requests = [];
    }

    // 3️⃣ Add new request
    const newRequest = { userId, name, email, phone };
    mentor.requests.push(newRequest);

    // 4️⃣ Save updated mentor
    await mentor.save();

    res.json({ message: "Request sent successfully", mentor });
  } catch (error) {
    console.error("Error in /request-mentor:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ **API for Mentor to Accept a Request**
app.post("/accept-request/:mentorId/:userId", async (req, res) => {
  const { mentorId, userId } = req.params;

  try {
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    // Find the request in mentor's requests array
    const requestIndex = mentor.requests.findIndex((req) => req.userId.toString() === userId);

    if (requestIndex === -1) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Update request status to "Accepted"
    mentor.requests[requestIndex].status = "Accepted";

    // Save the updated mentor
    await mentor.save();

    res.json({ message: "Request accepted successfully", mentor });
  } catch (error) {
    console.error("Error in /accept-request:", error);
    res.status(500).json({ message: "Server error", error });
  }
});







// ✅ UPDATE PROFILE
app.put("/updateProfile", async (req, res) => {
  try {
    const { email, name, phone, address, subjectsInterested } = req.body;

    const user = await UsersModel.findOneAndUpdate(
      { email }, // ✅ Finding the user by email
      { name, phone, address, subjectsInterested },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: "User not found!" });

    res.json({ message: "Profile updated!", user });
  } catch (error) {
    console.error("❌ Update Profile Error:", error);
    res.status(500).json({ error: "Update failed!" });
  }
});

// ✅ Fetch user data based on email
app.get("/getUser", async (req, res) => {
  const { email } = req.query;

  try {
    const user = await UsersModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // Send full user data
  } catch (error) {
    console.error("❌ Error fetching user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ ADD MENTOR
app.post("/add-mentor", async (req, res) => {
  console.log("Received Data:", req.body);  // Debugging step
  try {
      const mentor = new Mentor(req.body);
      await mentor.save();
      res.status(201).json({ message: "Mentor added successfully!" });
  } catch (error) {
      console.error("Error saving mentor:", error);
      res.status(400).json({ error: error.message });
  }
});



// ✅ SERVER START
app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
