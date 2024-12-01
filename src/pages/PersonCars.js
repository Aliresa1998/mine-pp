import { Row } from "antd";
import React, { useState } from "react";
import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined, CarOutlined } from "@ant-design/icons";
import AddCars from "./AddCars";
const dataSource = [
  {
    key: "1",
    name: "جواد",
    family: "عطار",
    car: "مزدا دو کابین",
    plate: "۱٣ س ٢٥٣",
    organization: "-",
  },
  {
    key: "2",
    name: "حمید",
    family: "مطهری",
    car: "نیسان زامیاد",
    plate: "۱۸ ن ۵۲۴",
    organization: "-",
  },
  {
    key: "3",
    name: "لطیف الله",
    family: "زینی",
    car: "کامیون ۱۰ تن آبی",
    plate: "۲۸ ع ۴۳۵",
    organization: "-",
  },
];

const columns = [
  {
    title: "ردیف",
    dataIndex: "key",
    key: "key",
    render: (text, _, index) => index + 1,
  },
  {
    title: "نام",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "نام خانوادگی",
    dataIndex: "family",
    key: "family",
  },
  {
    title: "خودرو",
    dataIndex: "car",
    key: "car",
  },
  {
    title: "پلاک",
    dataIndex: "plate",
    key: "plate",
    render: (plate) => (
      <div style={{ direction: "rtl", textAlign: "center" }}>{plate}</div>
    ),
  },
  {
    title: "سازمان",
    dataIndex: "organization",
    key: "organization",
  },
  {
    title: "عملیات",
    key: "actions",
    render: (_, record) => (
      <Space>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => console.log("Edit", record)}
        >
          ویرایش
        </Button>
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          onClick={() => console.log("Delete", record)}
        >
          حذف
        </Button>
        <Button
          type="default"
          icon={<CarOutlined />}
          onClick={() => console.log("Traffic", record)}
        >
          ترددها
        </Button>
      </Space>
    ),
  },
];

const PersonCars = () => {
  const [showAddCars, setShowAddCars] = useState(false);

  const showTableMain = () => {
    setShowAddCars(false);
  };

  return showAddCars ? (
    <AddCars showTableMain={showTableMain} />
  ) : (
    <div style={{ width: "100%" }} className="mine_card">
      <div className="mine_card_title">مشخصات معدن</div>
      <div style={{ padding: "20px" }}>
        <Button
          onClick={() => {
            setShowAddCars(true);
          }}
          type="primary"
          style={{ marginBottom: "20px" }}
          //onClick={() => console.log("Add new car")}
        >
          افزودن خودرو
        </Button>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default PersonCars;
