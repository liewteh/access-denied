import { Route, Switch } from "react-router-dom";

// import About from "./pages/About";
import ClassRegisterForm from "./pages/ClassRegisterForm";
import Home from "./pages/Home";
import Cohorts from "./pages/Cohorts";
import CohortClasses from "./pages/CohortsClasses";

const App = () => (
  <Switch>
    <Route path="/" exact>
      <Home />
    </Route>
    <Route path="/cohorts" exact>
      <Cohorts />
    </Route>
    <Route path="/cohorts/:cohortId/classes" component={CohortClasses} exact />
    <Route path="/cohorts/:cohortId/classRegisterForm">
      <ClassRegisterForm />
    </Route>
  </Switch>
);

export default App;
