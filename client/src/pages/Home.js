import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";


export function Home() {

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	
	

	return (
		<main role="main">
		<div className="container">
			<div className="heading">
			<img
            className="logo"
            src="https://syllabus.codeyourfuture.io/img/logo.png"
            alt="cyf_logo"
            />
		  	</div>
			<div className="title">
				<h1 className="message">Class Register</h1>
				<h2>Welcome</h2>
				<h3>Please Sign In</h3>
			</div>
		     <div className="login">
			 	
				 <input onChange={(e) => setUsername(e.target.value)} placeholder="username" type="text"></input> 
			 </div>
			 <div className="login">
			     <input onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password"></input>
			 </div>

				<Link to="/about/this/site">
				<button  className="login-btn">Sign In</button>
				</Link>
		</div>

		</main>
	);
}

export default Home;
