import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";

import NavBar from "./components/NavBar";

import Home from "./pages/Home";

import SearchResults from "./pages/SearchResults";
import TaskDetails from "./components/TaskDetails";
import Purchase from "./pages/Purchase";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Profile from "./pages/Profile";
import Reviews from "./pages/Reviews";
import Classes from "./pages/Classes";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search/:type" exact component={SearchResults} />
          <Route path="/register" exact component={CreateAccount} />
          <Route path="/search/:type/:id" exact component={TaskDetails} />
          <Route path="/login" exact component={Login} />
          <Route path="/:username/reviews" exact component={Reviews} />
          <PrivateRoute path="/purchase" exact component={Purchase} />
          <PrivateRoute path="/classes" exact component={Classes} />
          <PrivateRoute path="/profile" exact component={Profile} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
