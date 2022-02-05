import React from "react";
import styles from "./Schedule.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Schedule = () => {
  return (
    <div className={styles.scheduleContainer}>
      <Container fluid="md">
        <Row>
          <Col className="title">
            <h2>Schedule</h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Schedule;
