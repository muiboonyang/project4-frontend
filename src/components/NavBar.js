import { NavLink, Link } from "react-router-dom";
import React, { useContext } from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./NavBar.module.css";
import AuthContext from "../context/AuthContext";

const NavBar = () => {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <>
      <div className={styles.navbar}>
        <Navbar>
          <Navbar.Brand>
            <NavLink to="/" exact style={{ textShadow: "1px 0 grey" }}>
              <i className="fa fa-fw fa-bicycle"></i> Anywhere Fitness
            </NavLink>
          </Navbar.Brand>

          <Nav className="me-auto">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/workouts" activeClassName={styles.active}>
              Workouts
            </NavLink>
            <NavLink to="/pricing" activeClassName={styles.active}>
              Pricing
            </NavLink>
            <NavLink to="/schedule" activeClassName={styles.active}>
              Schedule
            </NavLink>
            <NavLink to="/instructors" activeClassName={styles.active}>
              Instructors
            </NavLink>
          </Nav>

          <Nav>
            {user ? (
              <div className={styles.loggedInContainer}>
                <NavLink to="/reviews" activeClassName={styles.active}>
                  Reviews
                </NavLink>
                <NavLink to="/purchase" activeClassName={styles.active}>
                  Purchase
                </NavLink>
                <NavLink to="/myclasses" activeClassName={styles.active}>
                  My Classes
                </NavLink>
                <NavLink to="/profile" activeClassName={styles.active}>
                  <i className="fa fa-fw fa-user"></i>
                  {user.name}
                </NavLink>
                <button onClick={logoutUser}>
                  <i className="fa fa-fw fa-sign-out"></i>
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
