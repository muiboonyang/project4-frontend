import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./CreateAccount.module.css";

const CreateAccount = () => {
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  let history = useHistory();

  //////////////////////////////////
  // CREATE user + personal fields
  //////////////////////////////////

  const createUser = async (e) => {
    if (password !== password2) {
      alert("Passwords don't match");
    } else {
      e.preventDefault();
      try {
        const res = await fetch(
          "https://anywhere-fitness-first.herokuapp.com/auth/register/",
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: e.target.email.value,
              password: e.target.password.value,
              name: e.target.name.value,
              surname: e.target.surname.value,
            }),
          }
        );

        await res.json();

        if (res.status === 200) {
          history.push("/login");
        } else {
          alert("Registration Failed!");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.createAccount}>
        <br />
        <h3>Create Account</h3>
        <br />

        <form onSubmit={createUser}>
          <Form.Group className="mb-3" controlId="formRegisterEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="text"
              name="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Row>
            <Form.Group
              as={Col}
              className="mb-3"
              controlId="formRegisterPassword1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text id="passwordHelpBlock" muted>
                Your password must contain at least 8 characters.
              </Form.Text>
            </Form.Group>
            <Form.Group
              as={Col}
              className="mb-3"
              controlId="formRegisterPassword2"
            >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="password2"
                placeholder="Re-enter password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              <Form.Text id="passwordHelpBlock" muted>
                Your password must contain at least 8 characters.
              </Form.Text>
            </Form.Group>
          </Row>

          <hr />

          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formGridName">
              <Form.Label>Given Name</Form.Label>
              <Form.Control
                type="input"
                name="name"
                placeholder="Enter name"
                required
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formGridSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="input"
                name="surname"
                placeholder="Enter surname"
                required
              />
            </Form.Group>
          </Row>

          <br />

          <div className="d-grid gap-2">
            <button className={styles.create} type="submit">
              Submit
            </button>
          </div>
        </form>

        <hr />

        <Form>
          <div className="d-grid gap-2">
            <NavLink to="/login">
              <button className={styles.login} type="submit">
                Already have an account? Click here to log in
              </button>
            </NavLink>
          </div>
        </Form>

        <br />
      </div>
    </div>
  );
};

export default CreateAccount;
