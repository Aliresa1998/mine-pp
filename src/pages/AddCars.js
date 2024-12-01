import React from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  Row,
  Col,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

const CarRegistrationForm = (props) => {
  const onFinish = (values) => {
    console.log("Submitted values:", values);
  };

  const backClick = () => {
    props.showTableMain();
  };

  return (
    <div style={{ width: "100%" }} className="mine_card">
      <div className="mine_card_title">
        <Row justify={"space-between"}>
          <Col>افزودن خودرو</Col>
          <Col onClick={backClick} style={{ cursor: "pointer" }}>
            بازگشت{" >"}
          </Col>
        </Row>
      </div>

      <div style={{ width: "100%", padding: "15px" }}>
        <Title level={4} style={{ textAlign: "center", marginBottom: "20px" }}>
          فرم ثبت خودرو
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            {/* پلاک */}
            <Col
              span={24}
              style={{ textAlign: "center", marginBottom: "16px" }}
            >
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  background: "#e6e6e6",
                  display: "inline-block",
                  padding: "10px 20px",
                  borderRadius: "5px",
                }}
              >
                <span>۱۳ س ۲۵۳</span>
              </div>
            </Col>

            {/* وضعیت مالکیت */}
            <Col span={12}>
              <Form.Item
                label="وضعیت مالکیت"
                name="ownershipStatus"
                rules={[
                  {
                    required: true,
                    message: "لطفاً وضعیت مالکیت را انتخاب کنید",
                  },
                ]}
              >
                <Select placeholder="انتخاب کنید">
                  <Option value="personal">شخصی</Option>
                  <Option value="organizational">سازمانی</Option>
                </Select>
              </Form.Item>
            </Col>

            {/* نام خودرو */}
            <Col span={12}>
              <Form.Item
                label="نام خودرو"
                name="carName"
                rules={[
                  { required: true, message: "لطفاً نام خودرو را وارد کنید" },
                ]}
              >
                <Input placeholder="مانند مزدا دو کابین" />
              </Form.Item>
            </Col>

            {/* اطلاعات راننده */}
            <Col span={12}>
              <Form.Item
                label="کد ملی"
                name="nationalCode"
                rules={[
                  {
                    required: true,
                    pattern: /^\d{10}$/,
                    message: "لطفاً کد ملی ۱۰ رقمی معتبر وارد کنید",
                  },
                ]}
              >
                <Input placeholder="۱۰ عدد رقمی بدون خط تیره" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="نام"
                name="firstName"
                rules={[{ required: true, message: "لطفاً نام را وارد کنید" }]}
              >
                <Input placeholder="مانند جواد" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="نام خانوادگی"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "لطفاً نام خانوادگی را وارد کنید",
                  },
                ]}
              >
                <Input placeholder="مانند عطار" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="شماره تماس"
                name="contactNumber"
                rules={[
                  { required: true, message: "لطفاً شماره تماس را وارد کنید" },
                ]}
              >
                <Input placeholder="شماره تماس" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="سمت (پست سازمانی)" name="organizationPosition">
                <Input placeholder="مانند مدیر" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="استان"
                name="province"
                rules={[
                  { required: true, message: "لطفاً استان را انتخاب کنید" },
                ]}
              >
                <Select placeholder="انتخاب استان">
                  <Option value="tehran">تهران</Option>
                  <Option value="isfahan">اصفهان</Option>
                  <Option value="mashhad">مشهد</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="شهرستان" name="city">
                <Input placeholder="شهرستان" />
              </Form.Item>
            </Col>

            {/* توضیحات بیشتر */}
            <Col span={24}>
              <Form.Item label="توضیحات بیشتر" name="additionalInfo">
                <TextArea rows={4} placeholder="توضیحات اضافه را وارد کنید" />
              </Form.Item>
            </Col>

            {/* آپلود عکس */}
            <Col span={24} style={{ textAlign: "center" }}>
              <Form.Item
                name="profilePicture"
                valuePropName="fileList"
                getValueFromEvent={(e) => e.fileList}
              >
                <Upload listType="picture-card" maxCount={1}>
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>افزودن عکس</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>

            {/* دکمه‌ها */}
            <Col span={24} style={{ textAlign: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ margin: "0 8px" }}
              >
                ثبت خودرو
              </Button>
              <Button onClick={backClick} htmlType="button" style={{ margin: "0 8px" }}>
                بازگشت
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default CarRegistrationForm;
