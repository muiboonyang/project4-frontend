import { NavLink } from "react-router-dom";
import React, { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRunning } from "@fortawesome/free-solid-svg-icons";

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
              <FontAwesomeIcon icon={faRunning} /> Anywhere Fitness
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
                <NavLink to="/classes" activeClassName={styles.active}>
                  My Classes
                </NavLink>
                <NavLink to="/profile" activeClassName={styles.active}>
                  <i className="fa fa-fw fa-user"></i>
                  {user.name}
                </NavLink>
                <button onClick={logoutUser} className={styles.logout}>
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
