import { Route, Switch } from "react-router-dom";
// import ClassRegisterResult from "./pages/ClassRegisterResult";
import Home from "./pages/Home";
import Cohorts from "./pages/Cohorts";
import CohortClasses from "./pages/CohortsClasses";
import SubmitForm from "./pages/SubmitForm";

const App = () => (
  <Switch>
    <Route path="/" exact>
      <Home />
    </Route>
    <Route path="/cohorts" exact>
      <Cohorts />
    </Route>
    <Route path="/cohorts/:cohortId/classes" component={CohortClasses} exact />
    <Route
      path="/cohorts/:cohortId/classes/:classId/students-attendance"
      exact
    >
      <SubmitForm isEditable={false} />
    </Route>
    <Route path="/submit/:cohortId/submit-attendance" exact>
      <SubmitForm isEditable={true} />
    </Route>
  </Switch>
);

export default App;
