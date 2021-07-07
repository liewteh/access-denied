import { Route, Switch } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Cohorts from "./pages/Cohorts";
import CohortClasses from "./pages/CohortsClasses";
import ClassRegisterResult from "./pages/ClassRegisterResult";

const App = () => (
  <Switch>
    <Route path="/" exact>
      <Home />
    </Route>
    <Layout>
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
        exact
      >
        <ClassRegisterResult isEditable={false} />
      </Route>
      <Route path="/cohorts/:cohortId/add-new-class" exact>
        <ClassRegisterResult isEditable={true} />
      </Route>
    </Layout>
  </Switch>
);

export default App;
