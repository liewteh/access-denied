import "./Header.css";

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import cyf_logo from "../../../img/cyf_logo.png";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const Header = () => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const fetchUsername = async () => {
      const response = await axios.get("/api/username");
      const user = response.data;
      setUsername(user);
    };
    fetchUsername();
  }, []);

  let history = useHistory();
  function logoutHandler() {
    console.log("logout clicked");
    axios.post("/api/logout").then(() => {
      history.push("/");
    });
  }

  return (
    <header className="header-container">
      <div className="header-left">
        <Link to="/" className="logo-container">
          <img
            className="header-logo"
            src={cyf_logo}
            alt="CYFLogo"
          />
        </Link>
      </div>
      <div className="header-right">
        <button
          className="header-btn back-btn"
          onClick={() => history.goBack()}
        >
          Back
        </button>
        <button
          className="header-btn logout-btn"
          onClick={() => logoutHandler()}
        >
          Logout
        </button>
        <div className="avatar-container">
          <AccountBoxIcon className="avatar" fontSize="large" />
          <p>{username}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
