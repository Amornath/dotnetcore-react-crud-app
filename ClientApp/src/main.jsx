import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import LogIn from "./auth/LogIn.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./auth/Register.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LogIn />} />
      <Route path="/rgister" element={<Register />} />
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>
);
