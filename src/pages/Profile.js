import React, { useContext, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Profile.module.css";
import AuthContext from "../context/AuthContext";

const Profile = () => {
  let { updateUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState([]);

  //================
  // Fetch user data from API (by specific username)
  //================

  // const url = `http://localhost:8000/personal-details/${currentUser}`;

  const url = `http://localhost:8000/personal-details/view/1/`;

  const getUserInfo = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setUserInfo(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={styles.profile}>
        <form onSubmit={updateUser}>
          <h2>Update Profile</h2>
          {/* <Form.Group className="mb-3" controlId="formRegisterUsername">
            <Form.Label>Username: </Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={userInfo.email}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRegisterPassword">
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <hr />

          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formGridEmail">
              <Form.Label>Name: </Form.Label>
              <Form.Control
                type="input"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={userInfo.name}
              />
            </Form.Group>
          </Row> */}

          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formNumber">
              <Form.Label>Contact number: </Form.Label>
              <Form.Control
                type="number"
                name="contact"
                placeholder={userInfo.contact}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress">
            <Form.Label>Address: </Form.Label>
            <Form.Control name="address" placeholder={userInfo.address_line} />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" controlId="formGridUnit">
              <Form.Label>Unit number: </Form.Label>
              <Form.Control name="unit" placeholder={userInfo.unit} />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formGridZip">
              <Form.Label>Zip code: </Form.Label>
              <Form.Control name="zipcode" placeholder={userInfo.postal_code} />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" controlId="formGridUnit">
              <Form.Label>Emergency Contact: </Form.Label>
              <Form.Control
                name="emergency_contact"
                placeholder={userInfo.emergency_contact}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formGridZip">
              <Form.Label>Emergency Number: </Form.Label>
              <Form.Control
                name="emergency_number"
                placeholder={userInfo.emergency_number}
              />
            </Form.Group>
          </Row>

          <button type="submit" className={styles.btn}>
            Update
          </button>
        </form>
      </div>
      <br />
      <br />
      <br />
    </>
  );
};

export default Profile;
