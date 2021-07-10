import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./CreateUser.css";
import user2 from "../../img/user2.png";

import Popup from "../components/ClassFormComponents/Popup";

const CreateUser = () => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(3);
  const [cohorts, setCohorts] = useState([]);
  const [selectCohorts, setSelectedCohorts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // function to close the popup that appears after form submission
  const togglePopup = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      history.push("/");
    }
  };

  useEffect(() => {
    axios
      .get("/api/roles")
      .then((res) => {
        const roles = res.data;
        console.log(roles);
        setRoles(roles);
      })
      .catch((error) => {
        console.error(`Error while fetching data. \n${error} `);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/cohorts")
      .then((res) => {
        console.log(res.data);
        const cohorts = res.data;
        console.log(cohorts);
        setCohorts(cohorts);
      })
      .catch((error) => {
        console.error(`Error while fetching data. \n${error} `);
      });
  }, []);

  function newUserHandler() {
    const newUser = {
      username: username,
      password: password,
      roleId: selectedRole,
      cohortIds: [selectCohorts],
      accountVerified: true,
    };
    console.log(newUser);
    axios
      .post("/api/create-user", {
        username: username,
        password: password,
        roleId: selectedRole,
        cohortIds: [selectCohorts],
        accountVerified: true,
      })
      .then(() => {
        console.log("user-created");
      })
      .catch((error) => {
        console.error(`Error while fetching data. \n${error} `);
      });
    togglePopup();
  }

  return (
    <div className="create-page">
      <h1 className="create-heading">Create New User</h1>
      <div className="create-container">
        <div className="left-container">
          <img className="user" src={user2} alt=""></img>
        </div>
        <div className="right-container">
          <h2>Create User</h2>
          <input
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            type="text"
          ></input>
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            type="text"
          ></input>
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="confirm password "
            type="text"
          ></input>
          <select name="roles" onBlur={(e) => setSelectedRole(e.target.value)}>
            <option value={roles.id}>Please choose a role</option>
            {roles.map((role, index) => {
              return (
                <option value={role.id} label={role.name} key={index}>
                  {role.name}
                </option>
              );
            })}
          </select>
          <select
            name="cohorts"
            onBlur={(e) => setSelectedCohorts(e.target.value)}
          >
            <option value={cohorts.id}>Please choose a cohort</option>
            {cohorts.map((cohort, index) => {
              return (
                <option
                  value={cohort.id}
                  label={cohort.region_name}
                  key={index}
                >
                  {cohort.region_name}
                </option>
              );
            })}
          </select>
          <button className="create-btn" onClick={newUserHandler}>
            Create
          </button>
          {isOpen && (
            <Popup
              content={
                <>
                  <b>User Created Successfully!</b>
                  <p>The user data successfully added to the database.</p>
                </>
              }
              handleClose={togglePopup}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
