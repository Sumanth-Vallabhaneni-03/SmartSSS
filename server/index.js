require("dotenv").config();
const bcrypt = require("bcryptjs");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const UsersModel = require("./models/users");
const Mentor = require("./models/mentors");


const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


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



//notifications
app.get("/notifications/:userName", async (req, res) => {
  try {
    const user = await UsersModel.findOne({ name: req.params.userName });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ notifications: user.notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal server error" });
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

app.get("/check-mentor/:userName", async (req, res) => {
  const { userName } = req.params;

  try {
    // Check if the user exists as a mentor in the database
    const mentor = await Mentor.findOne({ name: userName });

    res.json({ isMentor: !!mentor }); // Returns true if mentor exists, otherwise false
  } catch (error) {
    console.error("Error in /check-mentor:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/clear-notifications/:userName", async (req, res) => {
  try {
    await UsersModel.updateOne({ name: req.params.userName }, { $set: { notifications: [] } });
    res.json({ success: true, message: "Notifications cleared" });
  } catch (error) {
    console.error("Error clearing notifications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const generateGoogleMeetLink = () => {
  return "https://meet.google.com/new"; // This redirects to a new Google Meet session.
};

app.post("/accept-request/:mentorId/:username", async (req, res) => {
  const { mentorId, username } = req.params;

  try {
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    const request = mentor.requests.find((req) => req.name === username);
    if (!request) return res.status(404).json({ message: "Request not found" });

    // ✅ Generate Google Meet Link
    const meetLink = generateGoogleMeetLink();
    request.status = "Accepted";
    request.meetLink = meetLink;

    await mentor.save();

    // ✅ Notify User
    const user = await UsersModel.findOne({ name: username });
    if (user) {
      user.notifications.push({
  message: `Your mentor ${mentor.name} has accepted your request. Join - ${meetLink}`,
});

      await user.save();
    }

    res.json({ message: "Request accepted successfully", meetLink });
  } catch (error) {
    console.error("❌ Error in /accept-request:", error);
    res.status(500).json({ message: "Server error", error });
  }
});



// Fetch mentor with the highest requests count
app.get("/best-mentor", async (req, res) => {
  try {
    const bestMentor = await Mentor.find()
      .sort({ requests: -1 }) // Sort in descending order by requests array length
      .limit(1);

    if (bestMentor.length > 0) {
      res.status(200).json(bestMentor[0]);
    } else {
      res.status(404).json({ message: "No mentors found" });
    }
  } catch (error) {
    console.error("Error fetching best mentor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE route to remove a mentor
app.delete('/mentors/:name', async (req, res) => {
  const { name } = req.params;  // Extract mentor name from URL params

  try {
    // Find and delete the mentor by name
    const mentor = await Mentor.findOneAndDelete({ name });

    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    res.status(200).json({ message: "Mentor deleted successfully" });
  } catch (error) {
    console.error("Error deleting mentor:", error);
    res.status(500).json({ error: "Failed to delete mentor" });
  }
});




// ✅ SERVER START
app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
