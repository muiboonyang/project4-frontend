import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./utils/PrivateRoute";

import NavBar from "./components/NavBar";

// Public routes
import Home from "./pages/Home";
import Workouts from "./pages/Workouts";
import Pricing from "./pages/Pricing";
import Schedule from "./pages/Schedule";
import Instructors from "./pages/Instructors";
import InstructorProfile from "./pages/InstructorProfile";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";

// Public routes
import Reviews from "./pages/Reviews";
import Purchase from "./pages/Purchase";
import Classes from "./pages/Classes";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/workouts" exact component={Workouts} />
            <Route path="/pricing" exact component={Pricing} />
            <Route path="/schedule" exact component={Schedule} />
            <Route path="/instructors" exact component={Instructors} />
            <Route
              path="/instructor/:name"
              exact
              component={InstructorProfile}
            />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={CreateAccount} />
            <PrivateRoute path="/reviews" exact component={Reviews} />
            <PrivateRoute path="/purchase" exact component={Purchase} />
            <PrivateRoute path="/classes" exact component={Classes} />
            <PrivateRoute path="/profile" exact component={Profile} />
          </Switch>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
