import React, { useContext } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
  ErrorPanel
} from "@speechly/react-ui";
import Form from "./Form";
import { TrackerContext } from "../context/Context";

const Main = () => {
  const { balance } = useContext(TrackerContext);
  return (
    <div className="card m-1 bg-info">
      <div className="card-header">
        <h3>Expense Tracker</h3>
        <p>Try using Speech button.</p>
      </div>
      <div className="card-body">
        <h3 className="card-subtitle mb-2 text-white">
          Total Balance {balance}
        </h3>
        <Form />
      </div>
      <PushToTalkButtonContainer>
        <PushToTalkButton />
        <ErrorPanel />
      </PushToTalkButtonContainer>
    </div>
  );
};
export default Main;
