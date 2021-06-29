import { Route, Switch } from "react-router-dom";

import ClassRegisterForm from "./pages/ClassRegisterForm";
import Home from "./pages/Home";

const App = () => (
  <Switch>
    <Route path="/" exact>
      <Home />
    </Route>
    <Route
      path="/cohorts/:cohortId/classes/:classId/students-attendance"
      component={ClassRegisterForm}
      exact
    />
  </Switch>
);

export default App;
