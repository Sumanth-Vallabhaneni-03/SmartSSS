import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Crown } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { userLoginContext } from "../../contexts/UserLoginStore"; // Import user context
import "./BestMentor.css";

function BestMentor() {
  const { width, height } = useWindowSize();
  const [bestMentor, setBestMentor] = useState(null);
  const { currentUser } = useContext(userLoginContext); // Get logged-in user

  useEffect(() => {
    const fetchBestMentor = async () => {
      try {
        const response = await axios.get("https://smart-sss.vercel.app/best-mentor");
        setBestMentor(response.data || null);
      } catch (error) {
        console.error("Error fetching the best mentor:", error);
      }
    };
    fetchBestMentor();
  }, []);

  if (!bestMentor) return <div>Loading...</div>;

  const isCurrentUserBestMentor = currentUser?.name === bestMentor.name;

  return (
    <>
      {/* 🎉 Show Confetti only if the logged-in user is the best mentor */}
      {isCurrentUserBestMentor && <Confetti width={width} height={height} />}

      <div className="best-mentor-container">
        <h2>Best Mentor of the Time</h2>
        <motion.div
          className="best-mentor-details"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* 👑 Crown for ALL best mentors */}
          <motion.div
            className="crown-icon"
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ yoyo: Infinity, duration: 0.5 }}
          >
            <Crown color="gold" size={50} />
          </motion.div>

          <img
            src={bestMentor.image || "default-image.jpg"}
            alt={bestMentor.name || "Mentor"}
            className="mentor-image"
          />

          <h3>{bestMentor.name || "Unknown Mentor"}</h3>
          <p>
            <strong>Subjects:</strong> {bestMentor.subjects || "Not Available"}
          </p>
          <p>
            <strong>Requests Received:</strong>{" "}
            {Array.isArray(bestMentor.requests) ? bestMentor.requests.length : 0}
          </p>

          {/* 🎉 Congrats message for ALL best mentors */}
          <motion.div
            className="congrats-box"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            🎉 Congrats, {bestMentor.name}! 
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default BestMentor;
