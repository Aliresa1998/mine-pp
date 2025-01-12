import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Radio,
  Button,
  TimePicker,
  Row,
  Col,
  Table,
  Pagination,
  Modal,
} from "antd";
import { controller } from "../assets/controller/controller";
import moment from "moment-jalaali";
import ShowPlateSTR from "../components/ShowPlateSTR";
import { EyeOutlined } from "@ant-design/icons";
import config from "../assets/controller/config";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
const { Option } = Select;

const VehicleReportComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlate, setSelectedPlate] = useState(null);

  const showModal = (record) => {
    setSelectedPlate(record);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedPlate(null);
  };
  const columns = [
    {
      title: "شناسه",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "نام معدن",
      dataIndex: "mine_name",
      key: "mine_name",
    },
    {
      title: "مجوز",
      dataIndex: "permit",
      key: "permit",
      render: (permit) => (permit ? "بله" : "خیر"),
    },
    {
      title: "پلاک",
      dataIndex: "predicted_string",
      key: "predicted_string",
      render: (predicted_string) => (
        <div style={{ minWidth: "200px" }}>
          <ShowPlateSTR plate={predicted_string} />
        </div>
      ),
    },
    {
      title: "زمان شروع",
      dataIndex: "starttime",
      key: "starttime",
      render: (starttime) => {
        const parsedTime = moment(starttime, "YYYY-MM-DD-HH-mm-ss");
        return parsedTime.isValid()
          ? parsedTime.format("HH:mm:ss jYYYY/jMM/jDD")
          : "تاریخ نامعتبر";
      },
    },
    {
      title: "زمان پایان",
      dataIndex: "endtime",
      key: "endtime",
      render: (endtime) => {
        if (!endtime) return "نامشخص";
        const parsedTime = moment(endtime, "YYYY-MM-DD-HH-mm-ss");
        return parsedTime.isValid()
          ? parsedTime.format("HH:mm:ss jYYYY/jMM/jDD ")
          : "تاریخ نامعتبر";
      },
    },
    {
      title: "تصویر ",
      dataIndex: "raw_image_path",
      key: "raw_image_path",
      render: (url) => (
        <img width={300} src={config.apiGateway.URL + "/" + url} alt="car" />
      ),
    },
    {
      title: "تصویر پلاک ",
      dataIndex: "cropped_plate_path",
      key: "cropped_plate_path",
      render: (url) => (
        <img width={300} src={config.apiGateway.URL + "/" + url} alt="plate" />
      ),
    },
    {
      title: "اقدامات",
      key: "actions",
      render: (_, record) =>
        record.permit ? (
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => showModal(record)}
          >
            مشاهده
          </Button>
        ) : null,
    },
  ];

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const handleReadData = async () => {
    const response = await controller.readPlates(currentPage);

    setData(response.json.plates);
    setTotalData(response.json.count);
  };

  const handleChagePage = (event) => {
    setCurrentPage(event);
  };

  useEffect(() => {
    handleReadData();
  }, [currentPage]);

  return (
    <div style={{ width: "100%" }} className="mine_card">
      <div className="mine_card_title">مدیریت ترددها</div>
      <DatePicker calendar={persian} locale={persian_fa} />
      <div style={{ width: "100%", padding: "15px" }}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          style={{ marginTop: "20px" }}
          locale={{ emptyText: "هیچ داده‌ای در جدول وجود ندارد" }}
        />
        <br />
        <Pagination
          current={currentPage}
          total={totalData}
          onChange={handleChagePage}
        />
      </div>
      <Modal
        title="جزئیات پلاک"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            بستن
          </Button>,
        ]}
      >
        {selectedPlate && (
          <div>
            <Row
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong>شناسه:</strong>
              <span>{selectedPlate.id}</span>
            </Row>
            <Row
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong>نام معدن:</strong>
              <span>{selectedPlate.mine_name}</span>
            </Row>
            <Row
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong>نام مالک:</strong>
              <span>{selectedPlate.owner_name}</span>
            </Row>
            <Row
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong>سازمان:</strong>
              <span>{selectedPlate.organization}</span>
            </Row>
            <Row
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong>شماره تماس:</strong>
              <span>{selectedPlate.contact_number}</span>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default VehicleReportComponent;
