import React from "react";
import {
  Form,
  Input,
  Select,
  Radio,
  Button,
  DatePicker,
  TimePicker,
  Row,
  Col,
  Table,
} from "antd";

const { Option } = Select;

const VehicleReportComponent = () => {
  const columns = [
    {
      title: "ردیف",
      dataIndex: "row",
      key: "row",
    },
    {
      title: "نام راننده",
      dataIndex: "driverName",
      key: "driverName",
    },
    {
      title: "خودرو",
      dataIndex: "vehicle",
      key: "vehicle",
    },
    {
      title: "پلاک",
      dataIndex: "plate",
      key: "plate",
    },
    {
      title: "کد تردد",
      dataIndex: "trafficCode",
      key: "trafficCode",
    },
    {
      title: "ورودی/خروجی",
      dataIndex: "entryExit",
      key: "entryExit",
    },
    {
      title: "ساعت",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "تاریخ",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "آخرین وضعیت",
      dataIndex: "lastStatus",
      key: "lastStatus",
    },
    {
      title: "عملیات",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const data = [];

  return (
    <div style={{ width: "100%" }} className="mine_card">
      <div className="mine_card_title">مدیریت ترددها</div>

      <div style={{ width: "100%", padding: "15px" }}>
        <Form layout="vertical" style={{ padding: "20px" }}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="نام">
                <Input placeholder="نام" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="نام خانوادگی">
                <Input placeholder="نام خانوادگی" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="نام گروه">
                <Input placeholder="نام گروه" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="شماره پلاک">
                <Input addonBefore="99 ب 999" placeholder="ایران 99" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="نام خودرو">
                <Select placeholder="انتخاب خودرو">
                  <Option value="car1">خودرو 1</Option>
                  <Option value="car2">خودرو 2</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="وضعیت">
                <Select placeholder="انتخاب وضعیت">
                  <Option value="status1">وضعیت 1</Option>
                  <Option value="status2">وضعیت 2</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="از تاریخ">
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="انتخاب تاریخ"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="تا تاریخ">
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="انتخاب تاریخ"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="از ساعت">
                <TimePicker
                  style={{ width: "100%" }}
                  placeholder="انتخاب ساعت"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="تا ساعت">
                <TimePicker
                  style={{ width: "100%" }}
                  placeholder="انتخاب ساعت"
                />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="بر اساس دسته بندی پلاک">
                <Radio.Group defaultValue="all">
                  <Radio value="all">نمایش تمامی خودروها</Radio>
                  <Radio value="personal">خودروهای شخصی</Radio>
                  <Radio value="public">خودروهای عمومی</Radio>
                  <Radio value="govOrg">خودروهای دولتی / سازمانی</Radio>
                  <Radio value="military">خودروهای نظامی</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="بر اساس بومی / غیر بومی">
                <Radio.Group defaultValue="all">
                  <Radio value="all">نمایش تمامی خودروها</Radio>
                  <Radio value="localCity">فقط بومی شهر همدان</Radio>
                  <Radio value="localState">فقط بومی استان همدان</Radio>
                  <Radio value="nonLocal">فقط غیر بومی</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" style={{ marginRight: "10px" }}>
            اعمال فیلتر
          </Button>
          <Button>چاپ گزارش</Button>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
            style={{ marginTop: "20px" }}
            locale={{ emptyText: "هیچ داده‌ای در جدول وجود ندارد" }}
          />
        </Form>
      </div>
    </div>
  );
};

export default VehicleReportComponent;
