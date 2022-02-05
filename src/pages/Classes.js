import React from "react";
import styles from "./Classes.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Classes = () => {
  return (
    <div className={styles.classesContainer}>
      <Container fluid="md">
        <Row>
          <Col className="title">
            <h2>My Classes</h2>
          </Col>
        </Row>
        <Row>
          <Col>Class 1</Col>
          <Col>Class 2</Col>
          <Col>Class 3</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Classes;
