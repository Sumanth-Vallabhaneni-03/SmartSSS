import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Mentors.css";

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [userId, setUserId] = useState(""); // Store logged-in user ID
  const [requestedMentors, setRequestedMentors] = useState(new Set()); // Track requested mentors

  useEffect(() => {
    // ✅ Get logged-in user ID from localStorage (or auth context)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser._id) {
      setUserId(storedUser._id);
    }

    // ✅ Fetch mentors
    axios
      .get("http://localhost:3000/mentors")
      .then((response) => setMentors(response.data))
      .catch((error) => console.error("Error fetching mentors:", error));
  }, []);

  // ✅ Send mentor request
  const handleSendRequest = async (mentorId) => {
    if (!userId) {
      alert("Please log in first!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/send-request", {
        senderId: userId,
        receiverId: mentorId,
      });

      alert(response.data.message);
      setRequestedMentors((prev) => new Set(prev).add(mentorId)); // Track sent requests
    } catch (error) {
      console.error("Error sending request:", error);
      alert(error.response?.data?.message || "Failed to send request");
    }
  };

  return (
    <div className="container mt-2">
      <h2 className="text-center mb-4">Mentors</h2>
      <div className="row">
        {mentors.map((mentor) => (
          <div key={mentor._id} className="col-md-4 mb-4">
            <div className="card shadow-lg">
              <img
                src={mentor.image}
                alt={mentor.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{mentor.name}</h5>
                <p className="card-text"><strong>Subjects:</strong> {mentor.subjects}</p>
                <p className="card-text"><strong>Phone Number:</strong> {mentor.number}</p>
                <p className="card-text"><strong>Charge:</strong> ₹{mentor.charge}</p>

                {/* ✅ Send Request */}
                <button
                  onClick={() => handleSendRequest(mentor._id)}
                  className="btn btn-danger me-4"
                  disabled={requestedMentors.has(mentor._id)}
                >
                  {requestedMentors.has(mentor._id) ? "Request Sent" : "Send Request"}
                </button>

                {/* ✅ Video Call Button (Google Meet) */}
                <a
                  href="https://meet.google.com/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary me-2"
                >
                  Video Call
                </a>
                <br /><br />

                {/* ✅ Payment */}
                <a href="" target="_blank" className="btn btn-primary me-4">
                  Payment
                </a>

                {/* ✅ WhatsApp Call Button */}
                <a
                  href={`https://wa.me/${mentor.number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-info"
                >
                  Call
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentors;
