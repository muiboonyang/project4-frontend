import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Profile.module.css";
import useFetch from "../utils/useFetch";
import AuthContext from "../context/AuthContext";

const Profile = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  let { authTokens, user } = useContext(AuthContext);

  //////////////////////////////////
  // Store current user details in state
  //////////////////////////////////

  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);

  const [contact, setContact] = useState(userInfo.contact);
  const [date_of_birth, setDateOfBirth] = useState(userInfo.date_of_birth);
  const [gender, setGender] = useState(userInfo.gender);
  const [address_line, setAddressLine] = useState(userInfo.address_line);
  const [unit, setUnit] = useState(userInfo.unit);
  const [postal_code, setPostalCode] = useState(userInfo.postal_code);
  const [emergency_contact, setEmergencyContact] = useState(
    userInfo.emergency_contact
  );
  const [emergency_number, setEmergencyNumber] = useState(
    userInfo.emergency_number
  );

  //////////////////////////////////
  // Fetch user data from API (by specific username)
  // - Contact, DOB, Gender, Address, Unit, Postal Code, Emergency Contact, Emergency Number
  //////////////////////////////////

  const api = useFetch();

  const getUserInfo = async () => {
    try {
      const { response, data } = await api(
        `/personal-details/view/${user.user_id}`
      );

      if (response.status === 200) {
        setUserInfo(data);
      } else {
        alert("Failed to retrieve profile!");
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
    if (password !== password2) {
      alert("Passwords don't match");
    } else {
      e.preventDefault();
      try {
        // Update email, password, name, surname
        const res = await fetch(
          `http://127.0.0.1:8000/auth/update/${user.user_id}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authTokens?.access}`,
            },
            body: JSON.stringify({
              email: email,
              password: password,
              name: name,
              surname: surname,
            }),
          }
        );
        await res.json();

        // Update personal details
        const res2 = await fetch(
          `http://127.0.0.1:8000/personal-details/update/${user.user_id}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authTokens?.access}`,
            },
            body: JSON.stringify({
              contact: contact,
              date_of_birth: date_of_birth,
              gender: gender,
              address_line: address_line,
              unit: unit,
              postal_code: postal_code,
              emergency_contact: emergency_contact,
              emergency_number: emergency_number,
            }),
          }
        );
        await res2.json();

        if (res.status && res2.status === 200) {
          alert("Update Successful!");
          setEmail("");
          setName("");
          setSurname("");
          setContact("");
          setDateOfBirth("");
          setGender("");
          setAddressLine("");
          setUnit("");
          setPostalCode("");
          setEmergencyContact("");
          setEmergencyNumber("");
          window.location.reload(false);
        } else {
          alert("Update Failed!");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className={styles.profile}>
        <form onSubmit={updateUser}>
          <br />
          <h2>Update Profile</h2>
          <br />
          <Form.Group className="mb-3" controlId="formUpdateEmail">
            <Form.Label>Email: </Form.Label>
            <Form.Control
              type="input"
              name="email"
              placeholder={user.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Row>
            <Form.Group
              as={Col}
              className="mb-3"
              controlId="formUpdatePassword"
            >
              <Form.Label>New Password: </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter new password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              className="mb-3"
              controlId="formUpdatePassword2"
            >
              <Form.Label>Confirm New Password: </Form.Label>
              <Form.Control
                type="password"
                name="password2"
                placeholder="Enter new password"
                onChange={(e) => setPassword2(e.target.value)}
              />
            </Form.Group>
          </Row>

          <hr />

          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formGridName">
              <Form.Label>Given Name: </Form.Label>
              <Form.Control
                type="input"
                name="name"
                placeholder={user.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formGridSurname">
              <Form.Label>Surname: </Form.Label>
              <Form.Control
                type="input"
                name="surname"
                placeholder={user.surname}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formContact">
              <Form.Label>Contact number: </Form.Label>
              <Form.Control
                type="number"
                name="contact"
                placeholder={userInfo.contact}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formDateOfBirth">
              <Form.Label>Date of birth: </Form.Label>
              <Form.Control
                type="input"
                name="date_of_birth"
                placeholder={userInfo.date_of_birth}
                value={date_of_birth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formGender">
              <Form.Label>Gender: </Form.Label>
              <Form.Control
                type="input"
                name="gender"
                placeholder={userInfo.gender}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress">
            <Form.Label>Address: </Form.Label>
            <Form.Control
              name="address_line"
              placeholder={userInfo.address_line}
              value={address_line}
              onChange={(e) => setAddressLine(e.target.value)}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" controlId="formGridUnit">
              <Form.Label>Unit number: </Form.Label>
              <Form.Control
                name="unit"
                placeholder={userInfo.unit}
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              className="mb-3"
              controlId="formGridPostalCode"
            >
              <Form.Label>Postal code: </Form.Label>
              <Form.Control
                typ="number"
                name="postal_code"
                placeholder={userInfo.postal_code}
                value={postal_code}
                onChange={(e) => setPostalCode(e.target.value)}
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
                typ="input"
                name="emergency_contact"
                placeholder={userInfo.emergency_contact}
                value={emergency_contact}
                onChange={(e) => setEmergencyContact(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              className="mb-3"
              controlId="formEmergencyNumber"
            >
              <Form.Label>Emergency Number: </Form.Label>
              <Form.Control
                typ="number"
                name="emergency_number"
                placeholder={userInfo.emergency_number}
                value={emergency_number}
                onChange={(e) => setEmergencyNumber(e.target.value)}
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
