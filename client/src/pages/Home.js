import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Footer from '../components/Footer';
import "./Home.css";

export function Home() {
	const history = useHistory()

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function loginHandler(){
		axios.post('/api/login',{
			username: username,
			password: password
		}, undefined, {withCredentials: true})

		.then((res) => {
			history.push('/blah')
			console.log('hello');
		})
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
			 
				 <input onChange={(e) => setUsername(e.target.value)} placeholder="username" type="text"></input> 
			 </div>
			 <div className="login">
			     <input onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password"></input>
			 </div>

			 <div>
				<button  className="login-btn" onClick={loginHandler}>Sign In</button>
			</div>
			<div className="footer-component">
				<Footer />
		     </div>	
	
		 </div>
		

		
		

		</main>
	);
}

export default Home;
