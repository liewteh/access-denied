import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Welcome.css";
import user6 from "../../img/user6.jpg";
import cohorts1 from "../../img/cohorts1.png";

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
          <div className="create">
          <img className="user-img" src={user6}></img>
            <Link to="/create-user"><button className="welcome-btn">Create New User</button></Link>
          </div>
        )}
        <div className="cohort">
          <img className="cohort-img" src={cohorts1}></img>
          <Link to="/cohorts"><button className="welcome-btn">Go To Cohorts</button></Link>

        </div>
      </div>
    </div>
  );
};

export default Welcome;
