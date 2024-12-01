import { Row } from "antd";
import React, { useState } from "react";
import { Table, Input, Button, Col } from "antd";
import { EyeOutlined } from "@ant-design/icons";

// import images
import camera1 from "../assets/images/camera1.jpg";
import camera2 from "../assets/images/camera2.jpg";
import camera3 from "../assets/images/camera3.jpg";
import camera4 from "../assets/images/camera4.jpg";
import taradodDays from "../assets/images/tradodDays.jpg";
import tradodMonth from "../assets/images/tradodMonth.jpg";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const data = [
    {
      key: "1",
      city: "همدان",
      subscriberName: "معدن شماره 1",
    },
    {
      key: "2",
      city: "تبریز",
      subscriberName: "معدن شماره 2",
    },
    {
      key: "3",
      city: "اصفهان",
      subscriberName: "معدن شماره 3",
    },
  ];

  const handleSearch = () => {
    const filtered = data.filter((item) =>
      item.subscriberName.includes(searchText)
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "شهر",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "نام مشترک",
      dataIndex: "subscriberName",
      key: "subscriberName",
    },
    {
      title: "اقدامات",
      key: "actions",
      render: () => (
        <EyeOutlined style={{ fontSize: "16px", color: "#1890ff" }} />
      ),
    },
  ];

  return (
    <>
      <Row style={{ width: "100%" }}>
        <div style={{ width: "100%" }} className="mine_card">
          <div className="mine_card_title">مشخصات معدن</div>

          <div style={{ width: "100%", padding: "15px" }}>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <Input
                placeholder="نام معدن را جستجو کنید"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: "100%" }}
              />
              <Button type="primary" onClick={handleSearch}>
                جستجو
              </Button>
            </div>
            <Table
              columns={columns}
              dataSource={filteredData.length > 0 ? filteredData : data}
              pagination={{ pageSize: 5 }}
            />
          </div>
        </div>
      </Row>
      <br />

      <Row style={{ width: "100%" }} gutter={10}>
        <Col sm={6}>
          <div style={{ width: "100%" }} className="mine_card">
            <div className="mine_card_title">دوربین ورودی معدن</div>
            <img src={camera1} alt="camera" />
          </div>
        </Col>
        <Col sm={6}>
          <div style={{ width: "100%" }} className="mine_card">
            <div className="mine_card_title">دوربین خروجی معدن</div>
            <img src={camera2} alt="camera" />
          </div>
        </Col>
        <Col sm={6}>
          <div style={{ width: "100%" }} className="mine_card">
            <div className="mine_card_title">دوربین نمای کلی</div>
            <img src={camera3} alt="camera" />
          </div>
        </Col>
        <Col sm={6}>
          <div
            style={{ width: "100%", paddingLeft: "0px" }}
            className="mine_card"
          >
            <div className="mine_card_title">دوربین</div>
          </div>
          <img src={camera4} alt="camera" />
        </Col>
      </Row>
      <br />

      <Row style={{ width: "100%" }} gutter={[10, 10]}>
        <div style={{ width: "100%" }} className="mine_card">
          <div className="mine_card_title">تعداد ترددها در روزهای اخیر</div>
          <img
            style={{ width: "100%", padding: "10px 30px 20px 30px" }}
            src={taradodDays}
            alt="taradodDays"
          />
        </div>
      </Row>
      <br />
      <Row style={{ width: "100%" }} gutter={[10, 10]}>
        <div style={{ width: "100%" }} className="mine_card">
          <div className="mine_card_title">تعداد ترددها به تفکیک ماه‌ها</div>
          <img
            style={{ width: "100%", padding: "10px 30px 20px 30px" }}
            src={tradodMonth}
            alt="tradodMonth"
          />
        </div>
      </Row>
      <br />

      <Row style={{ width: "100%" }} gutter={[10, 10]}>
        <div style={{ width: "100%" }} className="mine_card">
          <div className="mine_card_title">مجموع وزن کشی در ماه اخیر</div>
          <img
            style={{ width: "100%", padding: "10px 30px 20px 30px" }}
            src={taradodDays}
            alt="taradodDays"
          />
        </div>
      </Row>
      <br />
      <Row style={{ width: "100%" }} gutter={[10, 10]}>
        <div style={{ width: "100%" }} className="mine_card">
          <div className="mine_card_title">مجموع وزن کشی به تفکیک ماه</div>
          <img
            style={{ width: "100%", padding: "10px 30px 20px 30px" }}
            src={tradodMonth}
            alt="tradodMonth"
          />
        </div>
      </Row>
    </>
  );
};

export default Home;
