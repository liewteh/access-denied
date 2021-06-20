import { Route, Switch } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import Cohorts from "./pages/Cohorts";
import CohortClasses from "./pages/CohortsClasses";

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
    <Route exact path="/cohorts/:cohortId/classes" component={CohortClasses} />
  </Switch>
);

export default App;
