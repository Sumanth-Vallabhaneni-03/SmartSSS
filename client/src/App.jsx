import { Routes, Route } from "react-router-dom";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Profile from "./Profile.jsx";  // ✅ Import Profile component
import Root from "./RootLayout.jsx"; 
import Home from "./components/Home/Home.jsx";
import Mentors from "./components/Mentors/Mentors.jsx";
import Aboutus from "./components/Aboutus/Aboutus.jsx"; 
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />  {/* ✅ Profile Route */}
      <Route path="/dashboard" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="mentors" element={<Mentors />} />
        <Route path="aboutus" element={<Aboutus />} />
      </Route>
    </Routes>
  );
}

export default App;
