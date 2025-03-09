import React, { useState, useEffect, useContext } from "react";
import { FaBell } from "react-icons/fa";
import { userLoginContext } from "../../contexts/UserLoginStore";
import axios from "axios";
import "./Notifications.css";

const Notifications = () => {
  const { currentUser } = useContext(userLoginContext);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (currentUser) {
        try {
          const encodedName = encodeURIComponent(currentUser.name);
          const response = await axios.get(`https://smart-bridge-backend.vercel.app/notifications/${encodedName}`);
          setNotifications(response.data.notifications);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    };
    fetchNotifications();
  }, [currentUser]);

  const handleBellClick = async () => {
    if (isOpen) {
      // ✅ Clear notifications only when closing
      setNotifications([]);

      // ✅ Optional: Clear notifications in the backend
      try {
        await axios.post(`https://smart-bridge-backend.vercel.app/clear-notifications/${currentUser.name}`);
      } catch (error) {
        console.error("Error clearing notifications:", error);
      }
    }

    setIsOpen(!isOpen); // Toggle dropdown
  };

  if (!currentUser) return null;

  return (
    <div className="notifications-container">
      <div className="notification-icon" onClick={handleBellClick}>
        <FaBell size={24} />
        {notifications.length > 0 && !isOpen && ( // ✅ Hide badge when opened
          <span className="notification-badge">{notifications.length}</span>
        )}
      </div>

      {isOpen && (
        <div className="notification-dropdown">
          <h5>Notifications</h5>
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((notif, index) => (
                <li key={notif._id || index} className="notification-item">
                 <strong className="text-wrap">{notif.message}</strong>
                  <span className="timestamp">
                    {new Date(notif.timestamp).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-notifications">No new messages</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
