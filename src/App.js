import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";

import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import CreateRequest from "./pages/CreateRequest";
import SearchResults from "./pages/SearchResults";
import TaskDetails from "./components/TaskDetails";
import MyTasks from "./pages/MyTasks";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Profile from "./pages/Profile";
import Reviews from "./pages/Reviews";

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
          <PrivateRoute path="/profile" exact component={Profile} />
          <PrivateRoute path="/createrequest" exact component={CreateRequest} />
          <PrivateRoute path="/mytasks" exact component={MyTasks} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
