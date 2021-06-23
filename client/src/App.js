import { Route, Switch } from "react-router-dom";
import ClassRegisterForm from "./pages/ClassRegisterForm";
import Home from "./pages/Home";
import Cohorts from "./pages/Cohorts";
import CohortClasses from "./pages/CohortsClasses";

const App = () => (
  <Switch>
    <Route path="/" exact>
      <Home />
    </Route>
    <Route path="/loginPage" exact>
      <Cohorts />
    </Route>
    {/* <Route path="/cohorts" exact></Route> */}
    <Route path="/cohorts/:cohortId/classes" component={CohortClasses} exact />
    <Route path="/classRegisterForm" exact>
      <ClassRegisterForm />
    </Route>
  </Switch>
);

export default App;
