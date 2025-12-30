import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../Navbar";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";
import API_BASE_URL from "../../config";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: "username" });
  const [activeTab, setActiveTab] = useState("overview");
  const { setCurrentUser } = useAuth();



useEffect(() => {
  const fetchUserDetails = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    try {
      const response = await axios.get(
        `${API_BASE_URL}/userProfile/${userId}`
      );
      setUserDetails(response.data);
    } catch (err) {
      console.error("Cannot fetch user details:", err);
    }
  };

  fetchUserDetails();
}, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setCurrentUser(null);
    window.location.href = "/auth";
  };

  return (
    <>
      <Navbar />
      
      <nav className="profile-nav">
        <button
          className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📖 Overview
        </button>
        <button
          className={`nav-tab ${activeTab === 'starred' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('starred');
            navigate("/repo");
          }}
        >
          📦 Starred Repositories
        </button>
      </nav>

      <button onClick={handleLogout} id="logout">
        Logout
      </button>

      <div className="profile-page-wrapper">
        <div className="user-profile-section">
          <div className="profile-image"></div>
          <div className="name">
            <h3>{userDetails.username}</h3>
          </div>
          <button className="follow-btn">Follow</button>
          <div className="follower">
            <p>10 Follower</p>
            <p>3 Following</p>
          </div>
        </div>
        <div className="heat-map-section">
          <HeatMapProfile />
        </div>
      </div>
    </>
  );
};

export default Profile;