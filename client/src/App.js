import { Route, Switch } from "react-router-dom";
import CohortList from "./components/CohortList";

import About from "./pages/About";
import Home from "./pages/Home";
import Cohorts from "./pages/Cohorts";

const App = () => (
  <Switch>
    <Route path="/" exact>
      <Home />
    </Route>
    <Route path="/about/this/site">
      <About />
    </Route>
    <Route path="/cohorts" exact>
      <Cohorts />
    </Route>
  </Switch>
);

export default App;
