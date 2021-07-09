import { Route, Switch } from "react-router-dom";

import Layout from "./components/Layout";
import ClassRegisterResult from "./pages/ClassRegisterResult";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import CreateUser from "./pages/CreateUser";
import Cohorts from "./pages/Cohorts";
import CohortClasses from "./pages/CohortsClasses";

const App = () => (
  <Switch>
    <Route path="/" exact>
      <Home />
    </Route>
    <Layout>
      <Route path="/welcome" exact>
        <Welcome />
      </Route>
      <Route path="/create-user">
        <CreateUser />
      </Route>
      <Route path="/cohorts" exact>
        <Cohorts />
      </Route>
      <Route
        path="/cohorts/:cohortId/classes"
        component={CohortClasses}
        exact
      />
      <Route
        path="/cohorts/:cohortId/classes/:classId/students-attendance"
        component={ClassRegisterResult}
        exact
      />
    </Layout>
  </Switch>
);

export default App;
