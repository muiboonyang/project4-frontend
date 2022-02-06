import React from "react";
import styles from "./Schedule.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Schedule = () => {
  return (
    <div className={styles.scheduleContainer}>
      <br />
      <h2>Schedule</h2>
      <br />
      <Container fluid="md">
        <Row>
          <Col className="title">Content</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Schedule;
