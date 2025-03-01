import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { userLoginContext } from "../../contexts/UserLoginStore"; 
import "./Profile.css";

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(userLoginContext);

  // State variables for user profile
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    subjectsInterested: "",
    createdAt: "",
    lastLogin: "",
  });

  // Fetch user data from the database
  useEffect(() => {
    if (currentUser?.email) {
      console.log("📡 Fetching user data from DB...");
      axios.get(`http://localhost:3000/getUser?email=${currentUser.email}`)
        .then((response) => {
          console.log("✅ User data fetched:", response.data);
          setUserData({
            name: response.data.name,
            email: response.data.email,
            phone: response.data.phone || "",
            address: response.data.address || "",
            subjectsInterested: response.data.subjectsInterested.join(", "),
            createdAt: new Date(response.data.createdAt).toLocaleDateString(),
          });
        })
        .catch((error) => {
          console.error("❌ Error fetching user data:", error);
        });
    }
  }, [currentUser]);

  const handleSave = async () => {
    console.log("📝 Saving updated profile:", userData);

    try {
      const response = await axios.put("http://localhost:3000/updateProfile", {
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        subjectsInterested: userData.subjectsInterested.split(",").map(sub => sub.trim()),
      });

      console.log("✅ Profile updated:", response.data);
      setCurrentUser(response.data.user);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("❌ Update failed:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="profile-container">
      <h2 className="ph2">👤 Profile</h2>
      <p className="pp"><strong>Email:</strong> {userData.email}</p>
      <p className="pp"><strong>Name:</strong> {userData.name}</p>
      <p className="pp"><strong>Account Created:</strong> {userData.createdAt}</p>

      <label className="plabel">Phone:</label>
      <input 
        className="pinput" 
        type="text" 
        value={userData.phone} 
        onChange={(e) => setUserData({ ...userData, phone: e.target.value })} 
        placeholder="Enter phone number" 
      />

      <label className="plabel">Address:</label>
      <input 
        className="pinput" 
        type="text" 
        value={userData.address} 
        onChange={(e) => setUserData({ ...userData, address: e.target.value })} 
        placeholder="Enter your address" 
      />

      <label className="plabel">Subjects Interested:</label>
      <input 
        className="pinput" 
        type="text" 
        value={userData.subjectsInterested} 
        onChange={(e) => setUserData({ ...userData, subjectsInterested: e.target.value })} 
        placeholder="Enter subjects (comma-separated)" 
      />

      <button className="profile-button" onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default Profile;
