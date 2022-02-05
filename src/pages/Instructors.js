import React from "react";
import styles from "./Instructors.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Instructors = () => {
  return (
    <div className={styles.instructorsContainer}>
      <Container fluid="md">
        <Row>
          <Col className="title">
            <h2>Instructors</h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Instructors;
