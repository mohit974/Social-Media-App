import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Auth from "./components/Auth/Auth";
import Home from "./components/Home";
import PostDetails from "./components/PostDetails/PostDetails";

export default function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/posts/search" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route
          path="/auth"
          element={user ? <Navigate to="/posts" replace /> : <Auth />}
        />
      </Routes>
    </BrowserRouter>
  );
}
