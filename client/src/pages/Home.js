import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";
import Footer from "../components/Footer";
import cyf_logo from "../../img/cyf_logo.png";

export function Home() {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // do a get request to check if a user is logged in.
  // if yes use the user)id and go to cohorts page
  // else show login screen
  // checkIfLoggedIn define fn
  // checkedifLogged in call function
  // if logged in redirect

  const isUserLoggedIn = async () => {
    const response = await axios.get("/api/checkLogin");
    const loggedUser = response.data;

    // check if loggedUser is an empty Object
    function isEmptyObject(value) {
      return Object.keys(value).length === 0 && value.constructor === Object;
    }
    if (!isEmptyObject(loggedUser)) {
      let path = "/welcome";
      history.push(path);
    }
  };

  isUserLoggedIn();

  function loginHandler() {
    axios
      .post(
        "/api/login",
        {
          username: username,
          password: password,
        },
        undefined,
        { withCredentials: true }
      )
      .then(() => {
        history.push("/welcome");
      });
  }

  return (
    <>
      <main role="main">
        <div className="container">
          <div className="heading">
            <img
              className="logo"
              src={cyf_logo}
              alt="cyf_logo"
            />
          </div>
          <div className="title">
            <h1 className="message">Class Register</h1>
            <h2>Welcome</h2>
          </div>
          <div className="login">
            <h3>Please Sign In</h3>

            <input
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              type="text"
            ></input>
          </div>
          <div className="login">
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              type="password"
            ></input>
          </div>

          <div>
            <button className="login-btn" onClick={loginHandler}>
              Sign In
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home;
