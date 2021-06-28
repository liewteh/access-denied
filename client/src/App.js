import { Route, Switch } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import About from "./pages/About";

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
    <Route path="/about/this/site">
      <About />
    </Route>
    <Route path="/blah">
      {" "}
      <LandingPage />
    </Route>
    <Route path="/cohorts" component={Cohorts} />
    <Route path="/cohorts/:cohortId/classes" component={CohortClasses} exact />
    <Route path="/cohorts/:cohortId/classRegisterForm">
      <ClassRegisterForm />
    </Route>
  </Switch>
);

export default App;
