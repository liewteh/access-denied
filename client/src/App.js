import { Route, Switch } from "react-router-dom";
// import About from "./pages/About";
import CreateUser from "./pages/CreateUser"

// import About from "./pages/About";
import Layout from "./components/Layout";
import ClassRegisterForm from "./pages/ClassRegisterForm";
import Home from "./pages/Home";
import Cohorts from "./pages/Cohorts";
import CohortClasses from "./pages/CohortsClasses";

const App = () => (
  <Switch>
    <Route path="/" exact>
      <Home />
    </Route>
    <Layout>
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
      <Route path="/cohorts/:cohortId/classRegisterForm" exact>
        <ClassRegisterForm />
      </Route>
    </Layout>
  </Switch>
);

export default App;
