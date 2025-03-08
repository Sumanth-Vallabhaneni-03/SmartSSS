import { Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Root from "./RootLayout"; 
import Home from "./components/Home/Home";
import Mentors from "./components/Mentors/Mentors";
import Aboutus from "./components/Aboutus/Aboutus";
import Profile from "./components/Profile/Profile"; // Import Profile
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="mentors" element={<Mentors />} />
        <Route path="aboutus" element={<Aboutus />} />
        <Route path="profile" element={<Profile />} /> {/* ✅ Add Profile Route */}
      </Route>
    </Routes>
  );
}

export default App;
