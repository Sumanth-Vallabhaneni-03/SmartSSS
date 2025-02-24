require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UsersModel = require("./models/users");
const MentorModel = require("./models/mentors");

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

mongoose.connect(mongoURI)
  .then(() => console.log("Connected to Smart database"))
  .catch((err) => console.error("Database connection error:", err));

// ✅ LOGIN ROUTE
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  UsersModel.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.json("User doesn't exist, please register to login!");
      }
      if (user.password === password) {
        return res.json("Success");
      } else {
        return res.json("The password is incorrect");
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// ✅ REGISTER ROUTE
app.post("/", async (req, res) => {
  try {
    const user = await UsersModel.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ADD MENTOR ROUTE
app.post("/mentors", async (req, res) => {
  try {
    const mentor = await MentorModel.create(req.body);
    res.json({ message: "Mentor added successfully!", mentor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET ALL MENTORS ROUTE
app.get("/mentors", async (req, res) => {
  try {
    const mentors = await MentorModel.find();
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const MentorRequest = require("./models/mentorRequest"); // Import Model

// ✅ SEND REQUEST
app.post("/send-request", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    
    // Check if request already exists
    const existingRequest = await MentorRequest.findOne({ senderId, receiverId, status: "pending" });
    if (existingRequest) return res.status(400).json({ message: "Request already sent" });

    const request = await MentorRequest.create({ senderId, receiverId });
    res.status(201).json({ message: "Request sent successfully", request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ACCEPT REQUEST
app.put("/accept-request/:requestId", async (req, res) => {
  try {
    const { requestId } = req.params;
    
    const request = await MentorRequest.findByIdAndUpdate(requestId, { status: "accepted" }, { new: true });
    if (!request) return res.status(404).json({ message: "Request not found" });

    res.json({ message: "Request accepted", request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET PENDING REQUESTS FOR MENTOR
app.get("/requests/:mentorId", async (req, res) => {
  try {
    const { mentorId } = req.params;
    const requests = await MentorRequest.find({ receiverId: mentorId, status: "pending" }).populate("senderId", "name email");

    res.json({ count: requests.length, requests });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
