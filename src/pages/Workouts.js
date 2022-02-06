import React from "react";
import styles from "./Workouts.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Workouts = () => {
  return (
    <div className={styles.workoutsContainer}>
      <br />
      <h2>Workouts</h2>
      <br />
      <Container fluid="md">
        <Row>
          <Col className="title">Content</Col>
        </Row>
        <Row>
          <Col>Workout 1</Col>
          <Col>Workout 2</Col>
          <Col>Workout 3</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Workouts;
