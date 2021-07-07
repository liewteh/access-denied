import React from "react";
import { useHistory } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {
  const history = useHistory();

  let test = "Admin";
  let createUserOption, cohortsOption;

  if (test === "Admin") {
    createUserOption = "showOption";
    cohortsOption = "showOption";
  } else if (test === "Teacher") {
    createUserOption = "hideOption";
    cohortsOption = "showOption";
  } else if (test === "Student") {
    createUserOption = "hideOption";
    cohortsOption = "hideOption";
  }

  const routeChangeCreateUser = () => {
    console.log("createUser clicked!")
  };

  const routeChangeCohorts = () => {
    let path = `/cohorts`;
    history.push(path);
  };

  return (
    <div className="welcomePage">
      <h1 className="welcomePageHeading">Welcome {test}</h1>
      <div className="optionsContainer">
        <h2 className={createUserOption} onClick={routeChangeCreateUser} role="link">Create User</h2>
        <h2 className={cohortsOption} onClick={routeChangeCohorts} role="link">
          Cohorts
        </h2>
      </div>
    </div>
  );
};

export default Welcome;
