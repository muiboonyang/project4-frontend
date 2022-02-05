import React from "react";
import styles from "./Pricing.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Pricing = () => {
  return (
    <div className={styles.pricingContainer}>
      <Container fluid="md">
        <Row>
          <Col className="title">
            <h2>Packages</h2>
          </Col>
        </Row>
        <Row>
          <Col>Package 1</Col>
          <Col>Package 2</Col>
          <Col>Package 3</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Pricing;
