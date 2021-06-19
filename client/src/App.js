import { Route, Switch } from "react-router-dom";

import About from "./pages/About";
import ClassRegisterForm from "./pages/ClassRegisterForm";
import Home from "./pages/Home";

const App = () => (
  <Switch>
    <Route path="/" exact><Home /></Route>
	< Route path = "/classRegisterForm" > <ClassRegisterForm /> </Route>
    <Route path="/about/this/site"><About /></Route>
  </Switch>
);

export default App;
