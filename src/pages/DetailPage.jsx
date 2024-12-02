// src/pages/DetailPage.jsx

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { item } = location.state;

  return (
    <div>
      <h1>Detail Page</h1>
      <h2>{item.title}</h2>
      <p>{item.body}</p>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default DetailPage;
