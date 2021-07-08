import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {

  // TODO selectedUser - to hide/display options
  let isAdmin = true;

  //  TODO goto Create User page
  const routeChangeCreateUser = () => {
    console.log("createUser clicked!");
  };

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
