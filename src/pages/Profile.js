import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Profile.module.css";
import useFetchGet from "../utils/useFetchGet";
import AuthContext from "../context/AuthContext";

const Profile = () => {
  const [userInfo1, setUserInfo1] = useState([]);
  const [userInfo2, setUserInfo2] = useState([]);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  let { user, authTokens } = useContext(AuthContext);

  //////////////////////////////////
  // Store current user details in state
  //////////////////////////////////

  const [email, setEmail] = useState(userInfo1.email);
  const [name, setName] = useState(userInfo1.name);
  const [surname, setSurname] = useState(userInfo1.surname);

  const [contact, setContact] = useState(userInfo2.contact);
  const [date_of_birth, setDateOfBirth] = useState(userInfo2.date_of_birth);
  const [gender, setGender] = useState(userInfo2.gender);
  const [address_line, setAddressLine] = useState(userInfo2.address_line);
  const [unit, setUnit] = useState(userInfo2.unit);
  const [postal_code, setPostalCode] = useState(userInfo2.postal_code);

  //////////////////////////////////
  // Fetch user data from API (by specific username)
  // - Contact, DOB, Gender, Address, Unit, Postal Code, Emergency Contact, Emergency Number
  //////////////////////////////////

  const get = useFetchGet();

  const getUserInfo1 = async () => {
    try {
      const { res, data } = await get(`/auth/view/${user.user_id}`);

      if (res.status === 200) {
        setUserInfo1(data);
      }
      // else {
      //   alert("Failed to retrieve profile!");
      // }
    } catch (err) {
      console.log(err);
    }
  };

  const getUserInfo2 = async () => {
    try {
      const { res, data } = await get(`/personal-details/view/${user.user_id}`);

      if (res.status === 200) {
        setUserInfo2(data);
      }
      // else {
      //   alert("Failed to retrieve profile!");
      // }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // createUserDetailsModel();
    getUserInfo1();
    getUserInfo2();
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
        // Update section1: email, password, name, surname

        const res = await fetch(
          `https://anywhere-fitness-first.herokuapp.com/auth/update/${user.user_id}`,
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

        // Update section2: personal details

        const res2 = await fetch(
          `https://anywhere-fitness-first.herokuapp.com/personal-details/update/${user.user_id}`,
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
              type="email"
              name="email"
              placeholder={userInfo1.email}
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
              <Form.Label>*New Password: </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter new password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text id="passwordHelpBlock" muted>
                Your password must contain at least 8 characters.
              </Form.Text>
            </Form.Group>

            <Form.Group
              as={Col}
              className="mb-3"
              controlId="formUpdatePassword2"
            >
              <Form.Label>*Confirm Password: </Form.Label>
              <Form.Control
                type="password"
                name="password2"
                placeholder="Enter new password"
                onChange={(e) => setPassword2(e.target.value)}
              />
              <Form.Text id="passwordHelpBlock" muted>
                *Required <br />
              </Form.Text>
            </Form.Group>
          </Row>

          <hr />

          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formGridName">
              <Form.Label>Given Name: </Form.Label>
              <Form.Control
                name="name"
                placeholder={userInfo1.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formGridSurname">
              <Form.Label>Surname: </Form.Label>
              <Form.Control
                name="surname"
                placeholder={userInfo1.surname}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formContact">
              <Form.Label>Contact number: </Form.Label>
              <Form.Control
                maxLength={8}
                type="number"
                name="contact"
                placeholder={userInfo2.contact}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <Form.Text id="passwordHelpBlock" muted>
                Must begin with '6', '8' or '9'.
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formDateOfBirth">
              <Form.Label>Date of birth: </Form.Label>
              <Form.Control
                name="date_of_birth"
                placeholder={userInfo2.date_of_birth}
                value={date_of_birth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
              <Form.Text id="passwordHelpBlock" muted>
                Format: YYYY-MM-DD
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formGender">
              <Form.Label>Gender: </Form.Label>
              <Form.Control
                maxLength={1}
                name="gender"
                placeholder={userInfo2.gender}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
              <Form.Text id="passwordHelpBlock" muted>
                M / F
              </Form.Text>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress">
            <Form.Label>Address: </Form.Label>
            <Form.Control
              name="address_line"
              placeholder={userInfo2.address_line}
              value={address_line}
              onChange={(e) => setAddressLine(e.target.value)}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" controlId="formGridUnit">
              <Form.Label>Unit number: </Form.Label>
              <Form.Control
                name="unit"
                placeholder={userInfo2.unit}
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
                maxLength={6}
                type="number"
                name="postal_code"
                placeholder={userInfo2.postal_code}
                value={postal_code}
                onChange={(e) => setPostalCode(e.target.value)}
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
