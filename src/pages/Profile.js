import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Profile.module.css";
import useFetch from "../utils/useFetch";
import AuthContext from "../context/AuthContext";

const Profile = () => {
  const [userInfo, setUserInfo] = useState([]);
  let { authTokens } = useContext(AuthContext);

  //////////////////////////////////
  // Fetch user data from API (by specific username)
  //////////////////////////////////

  const api = useFetch();

  const getUserInfo = async () => {
    try {
      const { response, data } = await api("/personal-details/view/1");

      if (response.status === 200) {
        setUserInfo(data);
      } else {
        alert("Update Failed!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line
  }, []);

  //////////////////////////////////
  // UPDATE user
  //////////////////////////////////

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/personal-details/update/1",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens?.access}`,
          },
          body: JSON.stringify({
            // password: e.target.password.value,
            // name: e.target.name.value,
            // surname: e.target.surname.value,
            contact: e.target.contact.value,
            date_of_birth: e.target.date_of_birth.value,
            gender: e.target.gender.value,
            address_line: e.target.address_line.value,
            unit: e.target.unit.value,
            postal_code: e.target.postal_code.value,
            emergency_contact: e.target.emergency_contact.value,
            emergency_number: e.target.emergency_number.value,
          }),
        }
      );
      const data = await res.json();

      if (res.status === 200) {
        console.log(data);
      } else {
        alert("Update Failed!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={styles.profile}>
        <form onSubmit={updateUser}>
          <br />
          <h2>Update Profile</h2>
          <br />
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
            <Form.Group as={Col} className="mb-3" controlId="formNumber">
              <Form.Label>Date of birth: </Form.Label>
              <Form.Control
                type="input"
                name="date_of_birth"
                placeholder={userInfo.date_of_birth}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formNumber">
              <Form.Label>Gender: </Form.Label>
              <Form.Control
                type="input"
                name="gender"
                placeholder={userInfo.gender}
                value={userInfo.gender}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress">
            <Form.Label>Address: </Form.Label>
            <Form.Control
              name="address_line"
              placeholder={userInfo.address_line}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" controlId="formGridUnit">
              <Form.Label>Unit number: </Form.Label>
              <Form.Control name="unit" placeholder={userInfo.unit} />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formGridZip">
              <Form.Label>Postal code: </Form.Label>
              <Form.Control
                name="postal_code"
                placeholder={userInfo.postal_code}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group
              as={Col}
              className="mb-3"
              controlId="formEmergencyContact"
            >
              <Form.Label>Emergency Contact: </Form.Label>
              <Form.Control
                name="emergency_contact"
                placeholder={userInfo.emergency_contact}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              className="mb-3"
              controlId="formEmergencyNumber"
            >
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
