import React from "react";
import { useHistory } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {
  const history = useHistory();

  // TODO selectedUser - to hide/display options
  let selectedUser = "Admin";
  let createUserOption, cohortsOption;

  if (selectedUser === "Admin") {
    createUserOption = "showOption";
    cohortsOption = "showOption";
  } else if (selectedUser === "Teacher") {
    createUserOption = "hideOption";
    cohortsOption = "showOption";
  } else if (selectedUser === "Student") {
    createUserOption = "hideOption";
    cohortsOption = "hideOption";
  }

  //  TODO goto Create User page
  const routeChangeCreateUser = () => {
    console.log("createUser clicked!");
  };

  //   goto cohorts page
  const routeChangeCohorts = () => {
    let path = `/cohorts`;
    history.push(path);
  };

  return (
    <div className="welcomePage">
      <h1 className="welcomePageHeading">Welcome {selectedUser}</h1>
      <div className="optionsContainer">
        <h2
          className={createUserOption}
          onClick={routeChangeCreateUser}
          role="link"
        >
          Create User
        </h2>
        <h2 className={cohortsOption} onClick={routeChangeCohorts} role="link">
          Cohorts
        </h2>
      </div>
    </div>
  );
};

export default Welcome;
