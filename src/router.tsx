import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import AboutExante from "./pages/AboutExante/AboutExante";
import AboutRevolut from "./pages/AboutRevolut/AboutRevolut";
import Main from "./pages/Main";

const AppRouter: React.FunctionComponent = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/revolut-details" component={AboutRevolut} />
      <Route exact path="/exante-details" component={AboutExante} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);

export default AppRouter;
