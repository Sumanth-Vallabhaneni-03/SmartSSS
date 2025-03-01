import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import "./Mentors.css";
import { userLoginContext } from "../../contexts/UserLoginStore";

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [requestedMentors, setRequestedMentors] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useContext(userLoginContext);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/mentors")
      .then((response) => setMentors(response.data))
      .catch((error) => console.error("Error fetching mentors:", error));
  }, []);

  useEffect(() => {
    if (currentUser?.email) {
      axios
        .get(`http://localhost:3000/getUser?email=${currentUser.email}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [currentUser]);

  const handleSendRequest = async (mentor) => {
    if (!currentUser || !currentUser.email) {
      alert("Please log in to send a request.");
      return;
    }

    const requestData = {
      userId: currentUser._id,
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone || "",
    };

    try {
      const response = await axios.post(
        `http://localhost:3000/request-mentor/${mentor._id}`,
        requestData
      );

      alert(response.data.message);
      setRequestedMentors((prev) => new Set([...prev, mentor._id]));
      setMentors((prevMentors) =>
        prevMentors.map((m) =>
          m._id === mentor._id
            ? { ...m, requests: [...(m.requests || []), requestData] }
            : m
        )
      );
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Something went wrong while sending the request.");
    }
  };

  const handleAcceptRequest = async (mentorId, userId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/accept-request`,
        { mentorId, userId }
      );
      alert(response.data.message);
      setMentors((prevMentors) =>
        prevMentors.map((mentor) =>
          mentor._id === mentorId
            ? {
                ...mentor,
                requests: mentor.requests.map((req) =>
                  req.userId === userId ? { ...req, status: "Accepted" } : req
                ),
              }
            : mentor
        )
      );
    } catch (error) {
      console.error("Error accepting request:", error);
      alert("Failed to accept request.");
    }
  };

  return (
    <div className="container mt-2">
      <h2 className="text-center mb-4">Mentors</h2>
      <div className="search-bar mb-4 text-center position-relative">
        <input
          type="text"
          className="form-control w-50 mx-auto ps-4"
          placeholder="Search by name or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="search-icon" />
      </div>

      <div className="row">
        {mentors.map((mentor) => (
          <div key={mentor._id} className="col-md-4 mb-4">
            <div className="card shadow-lg">
              <img src={mentor.image} alt={mentor.name} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
              <div className="card-body">
                <h5 className="card-title">{mentor.name}</h5>
                <p className="card-text"><strong>Subjects:</strong> {mentor.subjects}</p>
                <button
                  onClick={() => handleSendRequest(mentor)}
                  className="btn btn-danger me-4"
                  disabled={requestedMentors.has(mentor._id)}
                >
                  {requestedMentors.has(mentor._id) ? "Request Sent" : "Send Request"}
                </button>
                <h6 className="mt-4">Requests Received:</h6>
                {mentor.requests && mentor.requests.length > 0 ? (
                  <ul className="list-group">
                    {mentor.requests.map((request) => (
                      <li key={request.userId} className="list-group-item">
                        {request.name} ({request.email}) - {request.phone}
                        {request.status === "Accepted" ? (
                          <span className="text-success ms-2">(Accepted)</span>
                        ) : (
                          <button
                            onClick={() => handleAcceptRequest(mentor._id, request.userId)}
                            className="btn btn-success btn-sm ms-2"
                          >
                            Accept
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No requests yet.</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentors;
