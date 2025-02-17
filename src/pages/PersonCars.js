import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Space,
  Table,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
} from "antd";
import React, { useEffect, useState } from "react";
import { controller } from "../assets/controller/controller";
import ShowPlateSTR from "../components/ShowPlateSTR";
import moment from "moment-jalaali";
const { Option } = Select;

const LicensePlateInput = ({ value = "", onChange }) => {
  const [plateParts, setPlateParts] = useState({
    part1: "",
    part2: "",
    part3: "",
    part4: "",
  });

  useEffect(() => {
    const parts = value.split("-");
    if (parts.length === 4) {
      setPlateParts({
        part1: parts[0],
        part2: parts[1],
        part3: parts[2],
        part4: parts[3],
      });
    }
  }, [value]);

  const handleInputChange = (part, val) => {
    const newParts = { ...plateParts, [part]: val };
    setPlateParts(newParts);
    if (onChange) {
      onChange(
        `${newParts.part1}-${newParts.part2}-${newParts.part3}-${newParts.part4}`
      );
    }
  };

  return (
    <Space>
      <Input
        style={{ width: "40px" }}
        maxLength={2}
        value={plateParts.part4}
        onChange={(e) => handleInputChange("part4", e.target.value)}
      />
      <Input
        style={{ width: "60px" }}
        maxLength={3}
        value={plateParts.part3}
        onChange={(e) => handleInputChange("part3", e.target.value)}
      />
      <Select
        style={{ width: "80px" }}
        value={plateParts.part2}
        onChange={(val) => handleInputChange("part2", val)}
      >
        {Object.entries({
          SAD: "ص",
          TA: "ط",
          A: "الف",
          B: "ب",
          P: "پ",
          T: "ت",
          TH: "ث",
          J: "ج",
          CH: "چ",
          h: "ح",
          KH: "خ",
          D: "د",
          ZAL: "ذ",
          R: "ر",
          Z: "ز",
          ZH: "ژ",
          SIN: "س",
          SHIN: "ش",
          ZAD: "ض",
          ZA: "ظ",
          EIN: "ع",
          GHEIN: "غ",
          F: "ف",
          GHAF: "ق",
          K: "ک",
          G: "گ",
          L: "ل",
          M: "م",
          N: "ن",
          H: "ه",
          V: "و",
          Y: "ی",
          MALUL: "معلول",
        }).map(([value, label]) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </Select>

      <Input
        style={{ width: "50px" }}
        maxLength={2}
        value={plateParts.part1}
        onChange={(e) => handleInputChange("part1", e.target.value)}
      />
    </Space>
  );
};

const PersonCars = () => {
  const [showAddCars, setShowAddCars] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [mines, setMines] = useState([]);

  const fetchData = async () => {
    // read mines
    try {
      const res = await controller.readMines();
      console.log(res.json.data);
      setMines(res.json.data);
    } catch (e) {
      console.log(e);
    }

    try {
      const response = await controller.readVehicles();
      setDataSource(response.json.vehicles);
    } catch (e) {
      message.error("خطا در برقراری ارتباط با سرور");
    }
  };

  const handleAddCar = async () => {
    try {
      const values = await form.validateFields();
      values['start_date'] = '2025-01-01'
      values['end_date'] = '2026-01-01'
      values['mine_id'] =  values['mine_id'] + ''
      const response = await controller.addCar(values);
      if (response.status < 250) {
        fetchData();
        message.success("خودرو با موفقیت اضافه شد!");
        setShowAddCars(false);
        form.resetFields();
      } else {
        message.error("خطا در ثبت خودرو");
      }
    } catch (error) {
      console.error("Validation Failed:", error);
      message.error("خطا در برقراری ارتباط با سرور");
    }
  };

  const handleEditCar = async () => {
    try {
      const values = await editForm.validateFields();
      const response = await controller.editCar({ ...selectedCar, ...values });
      if (response.status < 250) {
        fetchData();
        message.success("ویرایش خودرو با موفقیت انجام شد!");
        setShowEditModal(false);
        setSelectedCar(null);
      } else {
        message.error("خطا در ویرایش خودرو");
      }
    } catch (error) {
      console.error("Validation Failed:", error);
      message.error("خطا در برقراری ارتباط با سرور");
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      const response = await controller.deleteCar(id);
      if (response.status < 250) {
        fetchData();
        message.success("خودرو با موفقیت حذف شد!");
      } else {
        message.error("خطا در حذف خودرو");
      }
    } catch (error) {
      message.error("خطا در برقراری ارتباط با سرور");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "ردیف",
      dataIndex: "key",
      key: "key",
      render: (text, _, index) => index + 1,
    },
    {
      title: "نام و نام خانوادگی",
      dataIndex: "owner_name",
      key: "owner_name",
    },
    {
      title: "شماره تماس",
      dataIndex: "contact_number",
      key: "contact_number",
    },
    {
      title: "پلاک",
      dataIndex: "license_plate",
      key: "license_plate",
      render: (license_plate) => (
        <>
          <div style={{ minWidth: "120px" }}>
            <ShowPlateSTR plate={license_plate} />
          </div>
        </>
      ),
    },
    {
      title: "سازمان",
      dataIndex: "organization_name",
      key: "organization_name",
    },
    {
      title: "تاریخ شروع مجوز",
      dataIndex: "start_date",
      key: "start_date",
      render: (start_date) => (
        <>{moment(start_date, "YYYY-MM-DD").format("jYYYY/jMM/jDD")}</>
      ),
    },
    {
      title: "تاریخ پایان مجوز",
      dataIndex: "end_date",
      key: "end_date",
      render: (end_date) => (
        <>{moment(end_date, "YYYY-MM-DD").format("jYYYY/jMM/jDD")}</>
      ),
    },
    {
      title: "وضعیت مجوز",
      dataIndex: "start_date",
      key: "start_date",
      render: (end_date) => (
        <>
          <div style={{ color: "green" }}>فعال</div>
        </>
      ),
    },
    {
      title: "عملیات",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedCar(record);
              setShowEditModal(true);
              editForm.setFieldsValue(record);
            }}
          >
            ویرایش
          </Button>
          <Popconfirm
            title="آیا از حذف این خودرو مطمئن هستید؟"
            onConfirm={() => handleDeleteCar(record.vehicle_id)}
            okText="بله"
            cancelText="خیر"
          >
            <Button type="danger" icon={<DeleteOutlined />}>
              حذف
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const [organLists, setOrganLists] = useState([]);

  const readOrganLists = async () => {
    const response = await controller.readOrgans();
    console.log(response.json.organizations);
    setOrganLists(response.json.organizations);
  };

  useEffect(() => {
    readOrganLists();
  }, []);

  return (
    <>
      <div style={{ width: "100%" }} className="mine_card">
        <div className="mine_card_title">خودروهای مجاز</div>
        <div style={{ padding: "20px" }}>
          <Button
            onClick={() => setShowAddCars(true)}
            type="primary"
            icon={<PlusOutlined />}
            style={{ marginBottom: "20px" }}
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
      <Modal
        title="افزودن خودرو"
        visible={showAddCars}
        onCancel={() => setShowAddCars(false)}
        onOk={handleAddCar}
        okText="افزودن"
        cancelText="لغو"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="owner_name"
            label="نام و نام خانوادگی"
            rules={[{ required: true, message: "این فیلد اجباری است" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contact_number"
            label="شماره تماس"
            rules={[{ required: true, message: "این فیلد اجباری است" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="license_plate"
            label="پلاک"
            rules={[{ required: true, message: "این فیلد اجباری است" }]}
          >
            <LicensePlateInput />
          </Form.Item>
          <Form.Item
            name="organization_id"
            label="سازمان"
            rules={[{ required: true, message: "این فیلد اجباری است" }]}
          >
            <Select placeholder="انتخاب سازمان">
              {organLists &&
                organLists.length > 0 &&
                organLists.map((org) => (
                  <Select.Option
                    key={org.organization_id}
                    value={org.organization_id}
                  >
                    {org.organization_name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="mine_id"
            label="معدن"
            rules={[{ required: true, message: "این فیلد اجباری است" }]}
          >
            <Select placeholder="انتخاب معدن">
              {mines &&
                mines.length > 0 &&
                mines.map((org) => (
                  <Select.Option
                    key={org.mine_id}
                    value={org.mine_id}
                  >
                    {org.mine_name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="ویرایش خودرو"
        visible={showEditModal}
        onCancel={() => setShowEditModal(false)}
        onOk={handleEditCar}
        okText="ویرایش"
        cancelText="لغو"
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            name="owner_name"
            label="نام و نام خانوادگی"
            rules={[{ required: true, message: "این فیلد اجباری است" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contact_number"
            label="شماره تماس"
            rules={[{ required: true, message: "این فیلد اجباری است" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="license_plate"
            label="پلاک"
            rules={[{ required: true, message: "این فیلد اجباری است" }]}
          >
            <LicensePlateInput />
          </Form.Item>
          <Form.Item
            name="organization_id"
            label="سازمان"
            rules={[{ required: true, message: "این فیلد اجباری است" }]}
          >
            <Select placeholder="انتخاب سازمان">
              {organLists &&
                organLists.length > 0 &&
                organLists.map((org) => (
                  <Select.Option
                    key={org.organization_id}
                    value={org.organization_id}
                  >
                    {org.organization_name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PersonCars;
