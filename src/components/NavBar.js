import { NavLink, Link } from "react-router-dom";
import React, { useContext } from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./NavBar.module.css";
import AuthContext from "../context/AuthContext";

import jwt_decode from "jwt-decode";

const NavBar = () => {
  let { user, logoutUser, authTokens } = useContext(AuthContext);

  return (
    <>
      <div className={styles.navbar}>
        <Navbar>
          <Navbar.Brand>
            <NavLink
              to="/"
              exact
              activeClassName={styles.active}
              style={{ textShadow: "1px 0 grey" }}
            >
              <i className="fa fa-fw fa-bicycle"></i> Anywhere Fitness
            </NavLink>
          </Navbar.Brand>

          <Nav className="me-auto">
            <Link to="/">Home</Link>
            <Link to="/workouts">Workouts</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/schedule">Schedule</Link>
            <Link to="/instructors">Instructors</Link>
          </Nav>

          <Nav>
            {user ? (
              <div className={styles.loggedInContainer}>
                <NavLink to="/purchase" activeClassName={styles.active}>
                  Purchase
                </NavLink>
                <NavLink to="/myclasses" activeClassName={styles.active}>
                  My Classes
                </NavLink>
                <NavLink to="/profile" activeClassName={styles.active}>
                  <i className="fa fa-fw fa-user"></i>
                </NavLink>
                <button onClick={logoutUser}>
                  <i className="fa fa-fw fa-sign-out"></i>
                  LOG OUT
                </button>
              </div>
            ) : (
              <NavLink to="/login" activeClassName={styles.active}>
                <i className="fa fa-fw fa-user"></i> Log In
              </NavLink>
            )}
          </Nav>
        </Navbar>
      </div>
    </>
  );
};

export default NavBar;
