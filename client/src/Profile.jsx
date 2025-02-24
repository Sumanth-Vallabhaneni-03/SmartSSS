import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/login"); // Redirect if user is not logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    navigate("/login");
  };

  if (!user) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">Profile</h2>
      <div className="card shadow-lg p-4">
        <h5><strong>Name:</strong> {user.name}</h5>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>User ID:</strong> {user._id}</p>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
