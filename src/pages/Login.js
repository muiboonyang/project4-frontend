import React, { useState, useEffect, useContext } from "react";
import { Redirect, NavLink } from "react-router-dom";
import LoginContext from "../context/login-context";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import styles from "./Login.module.css";

const Login = () => {
  const loginContext = useContext(LoginContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [store, setStore] = useState("");

  // const [successMessage, setSuccessMessage] = useState("");
  // const [failureMessage, setFailureMessage] = useState("");
  // const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    storeCollector();
  }, []);

  const storeCollector = () => {
    let store = JSON.parse(localStorage.getItem("login"));
    if (store && store.login) {
      setLogin(true);
      setStore(store);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/auth/login/", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await res.json();
      console.log(data);

      localStorage.setItem(
        "login",
        JSON.stringify({
          login: true,
          token: data.access,
        })
      );

      storeCollector();

      if (res.status === 200) {
        let displayName = email.split("@")[0];

        // loginContext.setLoggedIn(true);
        loginContext.setProfileName(displayName);
        // setSuccessMessage("Log in successful!");
        // setShowMessage(true);
        setEmail("");
        setPassword("");
      } else {
        // setFailureMessage("Log in unsuccessful!");
        // setShowMessage(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      {/* <div className={styles.message}>
        {successMessage ? <Redirect to="/" /> : null}
        {failureMessage && showMessage ? (
          <Alert
            variant="danger"
            onClose={() => setShowMessage(false)}
            dismissible
          >
            {failureMessage}
          </Alert>
        ) : null}
      </div> */}

      <br />

      <div className={styles.login}>
        {!login ? (
          <>
            <h3>Log In</h3>
            <br />

            <form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formLoginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formLoginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
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
        ) : (
          <p>You are already logged in</p>
        )}
      </div>
    </div>
  );
};

export default Login;
