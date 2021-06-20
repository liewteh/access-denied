import { Route, Switch } from "react-router-dom";
import LandingPage from "./pages/landingPage"
import About from "./pages/About";
import Home from "./pages/Home";

const App = () => (
	<Switch>
		<Route path="/" exact><Home /></Route>
		<Route path="/about/this/site"><About /></Route>
		<Route path="/blah"> <LandingPage/></Route>
	</Switch> 
);

export default App;
