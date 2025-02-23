import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ZoomAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleZoomCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please log in to complete Zoom integration.");
          navigate("/login");
          return;
        }

        try {
          await axios.get(`http://localhost:8080/api/v1/zoom/callback?code=${code}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          navigate("/zoom-success"); // Redirect to success page
        } catch (error) {
          console.error("Error handling Zoom callback:", error);
          alert("Failed to complete Zoom integration.");
        }
      }
    };

    handleZoomCallback();
  }, [navigate]);

  return (
    <div>
      <h1>Redirecting to Zoom for Authorization...</h1>
    </div>
  );
};

export default ZoomAuth;