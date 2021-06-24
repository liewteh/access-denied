import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Footer from "../components/Footer";
import "./Home.css";

export function Home() {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /****************************************************** */

  // Request on Client

  const auth = async () => {
    try {
      console.log("hello, authentication in process");
      console.log(username);
      console.log(password);
      const res = await axios.get("/api/authenticate", {
        auth: { user: username, password: password },
      });
      console.log(res);
      const user_id = res.data.user_id;
      history.push(`/user-cohorts/${user_id}`);
    } catch (e) {
      console.log(e);
    }
  };

  /****************************************************** */
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

      .then((res) => {
        history.push("/blah");
        console.log("hello");
      });
  }

  return (
    <main role="main">
      <div className="container">
        <div className="heading">
          <img
            className="logo"
            src="./client/img/cyf_logo.png"
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
          <button className="login-btn" onClick={auth}>
            Sign In
          </button>
        </div>
      </div>
      <div className="footer-component">
        <Footer />
      </div>
    </main>
  );
}

export default Home;
