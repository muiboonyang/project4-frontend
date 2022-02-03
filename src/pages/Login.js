import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
import styles from "./Login.module.css";
import AuthContext from "../context/AuthContext";

const Login = () => {
  let { loginUser } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <>
          <h3>Log In</h3>
          <br />

          <form onSubmit={loginUser}>
            <Form.Group className="mb-3" controlId="formLoginEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter email"
                name="email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLoginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                placeholder="Enter password"
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <button className={styles.submit}>Submit</button>
            </div>
          </form>

          <hr />

          <Form>
            <div className="d-grid gap-2">
              <NavLink to="/register">
                <button className={styles.create}>Create Account</button>
              </NavLink>
            </div>
          </Form>

          <br />
        </>
      </div>
    </div>
  );
};

export default Login;
