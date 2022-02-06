import React from "react";
import styles from "./Instructors.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Instructors = () => {
  return (
    <div className={styles.instructorsContainer}>
      <br />
      <h2>Instructors</h2>
      <br />
      <Container fluid="md">
        <Row>
          <Col className="title">Content</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Instructors;
