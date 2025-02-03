import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Pagination,
  Modal,
  Spin,
  Row,
  Popconfirm,
  Input,
  Select,
  Col,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { controller } from "../assets/controller/controller";
import moment from "moment-jalaali";
import ShowPlateSTR from "../components/ShowPlateSTR";
import config from "../assets/controller/config";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import EditedPlate from "../components/EditedPlate";
import { PopupMessage } from "../components/PopupMessage";
const { Option } = Select;

const VehicleReportComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    mine_name: "",
    permit: "",
    predicted_string: "",
    starttime: null,
    endtime: null,
  });
  const [filterVisible, setFilterVisible] = useState(false);
  const [newEditedPlate, setNewEditedPlate] = useState(null);
  const handleDelete = async (record) => {
    try {
      const response = await controller.removePlateTreffic(record);
      if (response.status < 250) {
        handleReadData();
        PopupMessage.openNotification(
          "bottom",
          "حذف موفقیت آمیز",
          "Successful"
        );
      } else {
        PopupMessage.openNotification("bottom", "خطا در حذف اطلاعات", "Error");
      }
      console.log("Deleting record", record);
    } catch (e) {
      message.error("خطا در برقراری ارتباط با سرور");
    }

    // Implement delete functionality here
  };

  const handleImageClick = (url) => {
    setSelectedImage(url);
    setIsModalVisible(true);
  };

  const handleEditClick = (record) => {
    setSelectedRecord(record);
    setIsEditModalVisible(true);
    setNewEditedPlate(record.predicted_string);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
    setSelectedRecord(null);
    setNewEditedPlate(null);
  };

  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    console.log("Applying filters:", filter);
    // Implement filter application logic here
  };

  const handleSubmitEdit = async (selectedRecord) => {
    setLoadingEdit(true);
    try {
      selectedRecord["predicted_string"] = newEditedPlate;
      const response = await controller.editTerraficPlate(selectedRecord);
      if (response.status < 250) {
        handleReadData();
        PopupMessage.openNotification(
          "bottom",
          "ویرایش موفقیت آمیز",
          "Successful"
        );
      } else {
        PopupMessage.openNotification(
          "bottom",
          "خطا در ویرایش اطلاعات",
          "Error"
        );
      }
      handleCloseEditModal();
    } catch (e) {
      message.error("خطا در برقراری ارتباط با سرور");
    }

    setLoadingEdit(false);
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
        <img
          width={300}
          src={config.apiGateway.URL + "/" + url}
          alt="car"
          onClick={() => handleImageClick(config.apiGateway.URL + "/" + url)}
          style={{ cursor: "pointer" }}
        />
      ),
    },
    {
      title: "تصویر پلاک ",
      dataIndex: "cropped_plate_path",
      key: "cropped_plate_path",
      render: (url) => (
        <img
          width={300}
          src={config.apiGateway.URL + "/" + url}
          alt="plate"
          onClick={() => handleImageClick(config.apiGateway.URL + "/" + url)}
          style={{ cursor: "pointer" }}
        />
      ),
    },
    {
      title: "اقدامات",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditClick(record)}
          >
            ویرایش
          </Button>
          <Popconfirm
            title="آیا از حذف این مورد اطمینان دارید؟"
            onConfirm={() => handleDelete(record)}
            okText="بله"
            cancelText="خیر"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              حذف
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleReadData = async () => {
    setLoading(true);
    try {
      const response = await controller.readPlates(currentPage, filter);
      setData(response.json.plates);
      setTotalData(response.json.count);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event) => {
    setCurrentPage(event);
  };

  const handleUpdateCurrentPlate = (e) => {
    setNewEditedPlate(e);
  };

  useEffect(() => {
    handleReadData();
  }, [currentPage]);

  useEffect(() => {
    handleReadData();
  }, [filter]);

  return (
    <div style={{ width: "100%" }} className="mine_card">
      <div className="mine_card_title">مدیریت ترددها</div>
      <div style={{ width: "100%", padding: "15px" }}>
        <Button
          type="primary"
          icon={<FilterOutlined />}
          onClick={() => setFilterVisible(!filterVisible)}
          style={{ marginBottom: "15px" }}
        >
          فیلترها
        </Button>
        {filterVisible && (
          <div>
            <div style={{ marginBottom: "15px" }}>
              <Input
                placeholder="نام معدن"
                value={filter.mine_name}
                onChange={(e) =>
                  handleFilterChange("mine_name", e.target.value)
                }
                style={{ marginBottom: "8px" }}
              />
              <Select
                allowClear
                placeholder="مجوز"
                value={filter.permit ? filter.permit : null}
                onChange={(value) => handleFilterChange("permit", value)}
                style={{ width: "100%", marginBottom: "8px" }}
              >
                <Option value={true}>بله</Option>
                <Option value={false}>خیر</Option>
              </Select>
              <Input
                placeholder="پلاک"
                value={filter.predicted_string}
                onChange={(e) =>
                  handleFilterChange("predicted_string", e.target.value)
                }
                style={{ marginBottom: "8px" }}
              />
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                //value={filter.starttime}
                onChange={(date) => {
                  if (date) {
                    // Convert Persian date to Gregorian Date object
                    const gregorianDate = date.toDate();
                    // Format to YYYY-MM-DD
                    const formattedDate = gregorianDate
                      .toISOString()
                      .split("T")[0];
                    handleFilterChange("starttime", formattedDate);
                  } else {
                    handleFilterChange("starttime", null);
                  }
                }}
                inputClass="antd-input"
                placeholder="تاریخ شروع"
                style={{ marginBottom: "8px" }}
              />
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                //value={filter.starttime}
                onChange={(date) => {
                  if (date) {
                    // Convert Persian date to Gregorian Date object
                    const gregorianDate = date.toDate();
                    // Format to YYYY-MM-DD
                    const formattedDate = gregorianDate
                      .toISOString()
                      .split("T")[0];
                    handleFilterChange("endtime", formattedDate);
                  } else {
                    handleFilterChange("endtime", null);
                  }
                }}
                inputClass="antd-input"
                placeholder="تاریخ پایان"
                style={{ marginBottom: "8px", marginRight: "15px" }}
              />
              {/* <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={filter.endtime}
                onChange={(date) => handleFilterChange("endtime", date)}
                inputClass="antd-input"
                placeholder="تاریخ پایان"
                style={{ marginBottom: "8px", marginRight: "15px" }}
              /> */}
            </div>
            <Row justify={"end"}>
              <Button type="primary" onClick={applyFilters}>
                اعمال فیلتر
              </Button>
            </Row>
          </div>
        )}

        {loading ? (
          <Spin
            size="large"
            style={{ display: "block", textAlign: "center" }}
          />
        ) : (
          <>
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              style={{ marginTop: "20px" }}
              locale={{ emptyText: "هیچ داده‌ای در جدول وجود ندارد" }}
            />
            <br />
            <Pagination
              showSizeChanger={false}
              current={currentPage}
              total={totalData}
              onChange={handleChangePage}
            />
          </>
        )}
      </div>
      <Modal
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        centered
      >
        {selectedImage && (
          <img src={selectedImage} alt="Large view" style={{ width: "100%" }} />
        )}
      </Modal>
      <Modal
        width={800}
        visible={isEditModalVisible}
        onCancel={handleCloseEditModal}
        footer={[
          <Button key="cancel" onClick={handleCloseEditModal}>
            لغو
          </Button>,
          <Button
            loading={loadingEdit}
            key="save"
            type="primary"
            onClick={() => handleSubmitEdit(selectedRecord)}
          >
            ذخیره
          </Button>,
        ]}
        centered
        title="ویرایش اطلاعات"
      >
        {selectedRecord && (
          <div>
            <Row gutter={[10]} align={"bottom"}>
              <Col span={"18"}>
                <img
                  style={{ width: "100%" }}
                  src={
                    config.apiGateway.URL + "/" + selectedRecord.raw_image_path
                  }
                  alt="car"
                />
              </Col>

              <Col span={"6"}>
                نام معدن :
                <Input
                  disabled
                  placeholder="نام معدن"
                  value={selectedRecord.mine_name}
                  onChange={(e) =>
                    setSelectedRecord({
                      ...selectedRecord,
                      mine_name: e.target.value,
                    })
                  }
                  style={{ marginBottom: "8px" }}
                />
                <br />
                مجوز :
                <Select
                  disabled
                  placeholder="مجوز"
                  value={selectedRecord.permit ? "بله" : "خیر"}
                  onChange={(value) =>
                    setSelectedRecord({
                      ...selectedRecord,
                      permit: value === "بله",
                    })
                  }
                  style={{ width: "100%", marginBottom: "8px" }}
                >
                  <Option value="بله">بله</Option>
                  <Option value="خیر">خیر</Option>
                </Select>
                <br />
                <img
                  style={{ width: "100%" }}
                  src={
                    config.apiGateway.URL +
                    "/" +
                    selectedRecord.cropped_plate_path
                  }
                  alt="car"
                />
              </Col>
            </Row>
            <br />
            <Row justify={"center"}>
              <EditedPlate
                plate={selectedRecord.predicted_string}
                handleUpdateCurrentPlate={handleUpdateCurrentPlate}
              />
            </Row>

            {/* <Input
              placeholder="پلاک"
              value={selectedRecord.predicted_string}
              onChange={(e) =>
                setSelectedRecord({
                  ...selectedRecord,
                  predicted_string: e.target.value,
                })
              }
              style={{ marginBottom: "8px" }}
            />
            */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default VehicleReportComponent;
