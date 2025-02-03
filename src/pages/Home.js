import { DeleteFilled, EditFilled, EyeOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  notification,
  Popconfirm,
  Row,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { controller } from "../assets/controller/controller";
import taradodDays from "../assets/images/tradodDays.jpg";
import tradodMonth from "../assets/images/tradodMonth.jpg";
import CountChart from "./CountChart";

const { Item } = Form;

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const onFinish = async (values) => {
    try {
      let response;
      if (isEditing) {
        response = await controller.updateMine(editingId, values);
      } else {
        response = await controller.createMine(values);
      }

      if (response.status < 250) {
        notification.success({
          message: "موفقیت",
          description: isEditing 
            ? "اطلاعات معدن با موفقیت به‌روزرسانی شد" 
            : "اطلاعات معدن با موفقیت ثبت شد",
        });
      }
      fetchMineData();
      setShowModal(false);
      form.resetFields();
      setIsEditing(false);
      setEditingId(null);
    } catch (e) {
      console.log(e);
      notification.error({
        message: "خطا",
        description: isEditing 
          ? "خطا در به‌روزرسانی اطلاعات معدن" 
          : "خطا در ثبت اطلاعات معدن",
      });
    }
  };

  const handleSearch = () => {
    const filtered = data.filter((item) => item.mine_name.includes(searchText));
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "شهر",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "نام معدن",
      dataIndex: "mine_name",
      key: "mine_name",
    },
    {
      title: "نام مشترک",
      dataIndex: "owner_name",
      key: "owner_name",
    },
    {
      title: "شماره تماس",
      dataIndex: "contact_number",
      key: "contact_number",
    },
    {
      title: "اقدامات",
      key: "actions",
      render: (_, record) => (
        <Row style={{ gap: "5px" }}>
          <EyeOutlined style={{ fontSize: "16px", color: "#1890ff" }} />
          <EditFilled 
            style={{ fontSize: "16px", color: "green" }} 
            onClick={() => handleEdit(record)} 
          />
          <Popconfirm
            title={" حذف معدن" + " " + record.mine_name}
            description="آیا از حذف این معدن مطمئن هستید؟"
            onConfirm={() => handleDelete(record)}
            okText="بله"
            cancelText="خیر"
          >
            <DeleteFilled style={{ fontSize: "16px", color: "red" }} />
          </Popconfirm>
        </Row>
      ),
    },
  ];

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setShowModal(true);
    setIsEditing(true);
    setEditingId(record.mine_id);
  };

  const handleDelete = async (record) => {
    try {
      const response = await controller.deleteMine(record.mine_id);
      fetchMineData();
      message.success("معدن با موفقیت حذف شد.");
    } catch (e) {
      console.log(e);
      message.error("خطا در حذف معدن");
    }
  };

  const fetchMineData = async () => {
    const response = await controller.readMines(searchText);
    setData(response.json.data);
  };

  useEffect(() => {
    fetchMineData();
  }, []);

  useEffect(() => {
    fetchMineData();
  }, [searchText]);

  return (
    <>
      <Modal
        title={isEditing ? "ویرایش معدن" : "فرم ثبت معدن"}
        visible={showModal}
        onCancel={() => {
          setShowModal(false);
          setIsEditing(false);
          form.resetFields();
        }}
        footer={null}
        centered
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Item
            label="نام معدن"
            name="mine_name"
            rules={[
              { required: true, message: "لطفا نام معدن را وارد کنید" },
              { max: 50, message: "نام معدن نباید بیشتر از ۵۰ کاراکتر باشد" },
            ]}
          >
            <Input placeholder="نام معدن را وارد کنید" />
          </Item>

          <Item
            label="شهر"
            name="location"
            rules={[
              { required: true, message: "لطفا شهر را وارد کنید" },
              {
                max: 100,
                message: "شهر نباید بیشتر از ۱۰۰ کاراکتر باشد",
              },
            ]}
          >
            <Input placeholder="شهر را وارد کنید" />
          </Item>

          <Item
            label="نام مالک"
            name="owner_name"
            rules={[
              { required: true, message: "لطفا نام مالک را وارد کنید" },
              {
                pattern: /^[\u0600-\u06FF\s]+$/,
                message: "نام مالک باید فارسی باشد",
              },
            ]}
          >
            <Input placeholder="نام مالک را وارد کنید" />
          </Item>

          <Item
            label="شماره تماس"
            name="contact_number"
            rules={[
              { required: true, message: "لطفا شماره تماس را وارد کنید" },
              { pattern: /^09\d{9}$/, message: "شماره تماس معتبر نیست" },
            ]}
          >
            <Input placeholder="شماره تماس را وارد کنید" />
          </Item>

          <Item>
            <Button type="primary" htmlType="submit" block>
              {isEditing ? "به‌روزرسانی اطلاعات" : "ثبت اطلاعات"}
            </Button>
          </Item>
        </Form>
      </Modal>

      <Row style={{ width: "100%" }}>
        <div style={{ width: "100%" }} className="mine_card">
          <div className="mine_card_title">مشخصات معدن</div>

          <div style={{ width: "100%", padding: "15px" }}>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <div
                style={{
                  marginBottom: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Input
                  placeholder="نام معدن را جستجو کنید"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ width: "300px" }}
                />
                <Button
                  type="primary"
                  style={{ backgroundColor: "green", color: "white" }}
                  onClick={() => {
                    setShowModal(true);
                    setIsEditing(false);
                    form.resetFields();
                  }}
                >
                  افزودن معدن
                </Button>
              </div>
            </div>
            <Table
              columns={columns}
              dataSource={filteredData.length > 0 ? filteredData : data}
              pagination={{ pageSize: 5 }}
              rowKey="mine_id"
            />
          </div>
        </div>
      </Row>

      <br />

      <Row style={{ width: "100%" }} gutter={[10, 10]}>
        <div style={{ width: "100%" }} className="mine_card">
          <div className="mine_card_title">تعداد ترددها در روزهای اخیر</div>
          <CountChart />
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