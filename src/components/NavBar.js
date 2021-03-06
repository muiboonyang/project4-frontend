import { NavLink } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import UserContext from "../context/UserContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRunning, faUser } from "@fortawesome/free-solid-svg-icons";

import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./NavBar.module.css";

const NavBar = () => {
  let { user, logoutUser } = useContext(AuthContext);
  let { balance } = useContext(UserContext);

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

          {user ? (
            <>
              <Nav>
                <NavLink to="/transactions">
                  <div className={styles.balance}>Credits: {balance}</div>
                </NavLink>
              </Nav>

              <Nav>
                <div className={styles.loggedInContainer}>
                  <Dropdown className={styles.dropdown}>
                    <Dropdown.Toggle
                      variant="dark"
                      style={{ fontWeight: "bold" }}
                      className={styles.dropdownHeader}
                    >
                      {user.name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                      variant="dark"
                      className={styles.dropdownMenu}
                    >
                      <NavLink to="/profile">
                        <Dropdown.Item as="button" value="profile">
                          Profile
                        </Dropdown.Item>
                      </NavLink>

                      <NavLink to="/bookings">
                        <Dropdown.Item as="button" value="classes">
                          My Classes
                        </Dropdown.Item>
                      </NavLink>

                      <NavLink to="/transactions">
                        <Dropdown.Item as="button" value="transactions">
                          Transactions
                        </Dropdown.Item>
                      </NavLink>

                      <NavLink to="/reviews">
                        <Dropdown.Item as="button" value="reviews">
                          Reviews
                        </Dropdown.Item>
                      </NavLink>

                      <NavLink to="/">
                        <Dropdown.Item
                          as="button"
                          value="logout"
                          onClick={logoutUser}
                        >
                          Logout
                        </Dropdown.Item>
                      </NavLink>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Nav>
            </>
          ) : (
            <Nav>
              <NavLink to="/login" activeClassName={styles.active}>
                <FontAwesomeIcon icon={faUser} /> Log In
              </NavLink>
            </Nav>
          )}
        </Navbar>
      </div>
    </>
  );
};

export default NavBar;
