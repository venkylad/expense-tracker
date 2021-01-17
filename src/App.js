import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Details from "./components/Details";
import ListUp from "./components/ListUp";
import Main from "./components/Main";

export default function App() {
  return (
    <Container>
      <Row>
        <Col xs="6" sm="6">
          <Details title="Income" />
        </Col>
        <Col xs="6" sm="6">
          <Details title="Expense" />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12">
          <Main />
        </Col>
      </Row>
    </Container>
  );
}
