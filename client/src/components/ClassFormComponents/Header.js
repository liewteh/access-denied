import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Header.css";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
const Header = () => {
  let history = useHistory();
  function logoutHandler() {
    console.log("logout clicked");
    axios
      .post(
        "/api/logout",
        {
          username: username,
          password: password,
        },
        undefined,
        { withCredentials: true }
      )
      .then(() => {
        history.push("/");
      });
  }
  return (
    <>
      <div className='header-container'>
        <div className='header-left'>
          <img
            className='header-logo'
            src='https://syllabus.codeyourfuture.io/img/logo.png'
            alt='CYFLogo'
          />
          <button className='back-btn' onClick={() => history.goBack()}>
            Back
          </button>
        </div>
        <div className='header-right'>
         
          <div className='avatar-container'>
            <AccountBoxIcon className='avatar' fontSize="large"  />
              <p>Admin</p>
          </div>
          <button className='logout-btn' onClick={() => logoutHandler()}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
