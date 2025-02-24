import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function RootLayout() {
  return (
    <div>
      <Header />
      <div className="container mt-4">
        <Outlet /> {/* ✅ This will render Home, Mentors, or any other child route */}
      </div>
      <Footer />
    </div>
  );
}

export default RootLayout;
