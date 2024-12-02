import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import PostPage from "./pages/PostPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/post" element={<PostPage />} />
      </Routes>
    </Router>
  );
};

export default App;
