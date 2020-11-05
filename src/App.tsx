import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.scss";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import { useAuth } from "./shared/utils/hooks/auth";

function App() {
  const { token } = useAuth();

  console.log(token);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Redirect to="/sign-in" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
