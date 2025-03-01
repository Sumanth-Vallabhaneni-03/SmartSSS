import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import UserLoginStore from "./contexts/UserLoginStore";  // ✅ No curly braces

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserLoginStore>  {/* ✅ Wrap App inside UserLoginStore */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserLoginStore>
);
