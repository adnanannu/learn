import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateMeeting = () => {
  const navigate = useNavigate();
  const [meetingDetails, setMeetingDetails] = useState({
    hostEmail: "",
    topic: "",
    startTime: "",
    duration: 30,
  });

  // Function to initiate Zoom OAuth
  const initiateZoomOAuth = async () => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    if (!token) {
      alert("Please log in to connect Zoom.");
      return;
    }
  
    try {
      const response = await axios.get("http://localhost:8080/api/v1/zoom/auth", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the authorization header
        },
      });
  
      // Redirect to the Zoom OAuth URL returned by the backend
      window.location.href = response.data.authUrl;
    } catch (error) {
      console.error("Error initiating Zoom OAuth:", error);
      alert("Failed to connect Zoom.");
    }
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    setMeetingDetails({ ...meetingDetails, [e.target.name]: e.target.value });
  };

  // Function to schedule a Zoom meeting
  const scheduleMeeting = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to schedule a meeting.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/zoom/schedule",
        meetingDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Meeting scheduled:", response.data);
      alert("Meeting scheduled successfully!");
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      alert("Failed to schedule meeting.");
    }
  };

  return (
    <div>
      <h1>Zoom Integration</h1>
      <button onClick={initiateZoomOAuth}>Connect Zoom</button>

      <form onSubmit={scheduleMeeting}>
        <div>
          <label>Host Email:</label>
          <input
            type="email"
            name="hostEmail"
            value={meetingDetails.hostEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Topic:</label>
          <input
            type="text"
            name="topic"
            value={meetingDetails.topic}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="datetime-local"
            name="startTime"
            value={meetingDetails.startTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Duration (minutes):</label>
          <input
            type="number"
            name="duration"
            value={meetingDetails.duration}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Schedule Meeting</button>
      </form>
    </div>
  );
};

export default CreateMeeting;







