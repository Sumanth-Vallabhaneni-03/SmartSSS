import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { FaSearch, FaCreditCard, FaVideo, FaWhatsapp } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure CSS is imported
import "./Mentors.css";
import { userLoginContext } from "../../contexts/UserLoginStore";

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [requestedMentors, setRequestedMentors] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleRequests, setVisibleRequests] = useState(null);
  const [loading, setLoading] = useState({});
  const { currentUser } = useContext(userLoginContext);

  useEffect(() => {
    axios
      .get("http://localhost:3000/mentors")
      .then((response) => setMentors(response.data))
      .catch(() => toast.error("Error fetching mentors!", { autoClose: 5000 }));
  }, []);

  const handleSendRequest = async (mentor) => {
    if (!currentUser?.email) {
      toast.warn("Please log in to send a request.", { autoClose: 5000 });
      return;
    }

    setLoading((prev) => ({ ...prev, [mentor._id]: true }));

    try {
      const response = await axios.post(
        `http://localhost:3000/request-mentor/${mentor._id}`,
        { userId: currentUser._id, name: currentUser.name, email: currentUser.email }
      );

      toast.success(response.data.message, { autoClose: 5000 });
      setRequestedMentors((prev) => new Set([...prev, mentor._id]));
      setMentors((prevMentors) =>
        prevMentors.map((m) =>
          m._id === mentor._id
            ? { ...m, requests: [...(m.requests || []), { name: currentUser.name, email: currentUser.email }] }
            : m
        )
      );
    } catch {
      toast.error("Something went wrong while sending the request.", { autoClose: 5000 });
    } finally {
      setLoading((prev) => ({ ...prev, [mentor._id]: false }));
    }
  };

  const handleAcceptRequest = useCallback(async (mentorId, userName) => {
    if (!mentorId || !userName) return toast.warn("Invalid request.", { autoClose: 5000 });

    setLoading((prev) => ({ ...prev, [`accept_${mentorId}_${userName}`]: true }));

    try {
      const response = await axios.post(`http://localhost:3000/accept-request/${mentorId}/${userName}`);
      toast.success(response.data.message, { autoClose: 5000 });
      setMentors((prevMentors) =>
        prevMentors.map((mentor) =>
          mentor._id === mentorId
            ? {
                ...mentor,
                requests: mentor.requests.map((req) =>
                  req.name === userName ? { ...req, status: "Accepted", meetLink: response.data.meetingLink } : req
                ),
              }
            : mentor
        )
      );
    } catch {
      toast.error("Failed to accept request.", { autoClose: 5000 });
    } finally {
      setLoading((prev) => ({ ...prev, [`accept_${mentorId}_${userName}`]: false }));
    }
  }, []);

  return (
    <div className="container mt-2">
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
        {mentors
          .filter((mentor) =>
            mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.subjects.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((mentor) => (
            <div key={mentor._id} className="col-md-4 mb-4">
              <div className="card shadow-lg">
                <img src={mentor.image} alt={mentor.name} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body">
                  <h5 className="card-title">{mentor.name}</h5>
                  <p className="card-text"><strong>Subjects:</strong> {mentor.subjects}</p>

                  {currentUser?.name != mentor.name && (
                    <div className="d-flex flex-wrap gap-2">
                      <button onClick={() => window.open(`https://wa.me/${mentor.number}`, "_blank")} className="btn btn-success">
                        <FaWhatsapp className="me-2"/>Chat
                      </button>
                      <button onClick={() => window.open(`https://meet.google.com/landing`, "_blank")} className="btn btn-primary">
                        <FaVideo className="me-2" />Meet
                      </button>
                      <button onClick={() => window.open(`https://payment-w9ad.onrender.com`, "_blank")} className="btn btn-warning">
                        <FaCreditCard className="me-2" />Pay
                      </button>
                    </div>
                  )}

                  {currentUser?.name !== mentor.name ? (
                    <button
                      onClick={() => handleSendRequest(mentor)}
                      className="btn btn-danger mt-2 w-100"
                      disabled={requestedMentors.has(mentor._id) || loading[mentor._id]}
                    >
                      {loading[mentor._id] ? "Sending..." : requestedMentors.has(mentor._id) ? "Request Sent" : "Send Request"}
                    </button>
                  ) : (
                    <button
                      onClick={() => setVisibleRequests((prev) => (prev === mentor._id ? null : mentor._id))}
                      className="btn btn-info mt-2 w-100"
                    >
                      {visibleRequests === mentor._id ? "Hide Requests" : "View Requests"}
                    </button>
                  )}

                  {visibleRequests === mentor._id && (
                    <>
                      <h6 className="mt-4">Requests Received:</h6>
                      {mentor.requests?.length > 0 ? (
                        <ul className="list-group">
                          {mentor.requests.map((request) => (
                            <li key={request.name} className="list-group-item">
                              {request.name} ({request.email})
                              {request.status === "Accepted" ? (
                                <span className="text-success ms-2">(Accepted)</span>
                              ) : (
                                <button onClick={() => handleAcceptRequest(mentor._id, request.name)} className="btn btn-success btn-sm ms-2">
                                  Accept
                                </button>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No requests received.</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Mentors;
