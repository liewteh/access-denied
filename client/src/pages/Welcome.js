import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Welcome.css";

const Welcome = () => {

  // TODO selectedUser - to hide/display options
  // let isAdmin = true;
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios.get("/api/username/role").then((res) => {
      if(res.data.role_id == 1) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
  }, []);

  return (
    <div className="welcomePage">
      <h1 className="welcomePageHeading">Welcome To CYF Register</h1>
      <div className="optionsContainer">
        {isAdmin && (
          <div>
            <Link to="/create-user">Create User</Link>
          </div>
        )}
        <div>
          <Link to="/cohorts">Cohorts</Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
