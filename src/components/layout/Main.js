import React from "react";
import SideBar from "./SideBar";
import { Col, Row } from "antd";
import Footer from "./Footer";

function Main({ children }) {
  return (
    <>
      <Row>
        <Col sm={5}>
          <SideBar />
        </Col>
        <Col sm={18}>
          <div style={{ margin: "15px", width: "100%" }}>{children}</div>
        </Col>
      </Row>
      <Footer />
    </>
  );
}

export default Main;
