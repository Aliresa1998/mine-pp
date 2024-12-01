import React from "react";
import {
  Card,
  Row,
  Col,
  Checkbox,
  Select,
  Input,
  DatePicker,
  Button,
  TimePicker,
  Switch,
} from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  CameraOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

const Olgo = () => {
  return (
    <div style={{ width: "100%" }} className="mine_card">
      <div className="mine_card_title">الگو و مجوزهای تردد</div>
      <div style={{ padding: "20px" }}>
        <Row gutter={[16, 16]}>
          {/* Title and Status */}
          <Col span={24}>
            <Row gutter={16}>
              <Col span={12}>
                <div className="mine_card">
                  <div className="mine_card_title">عنوان الگو</div>
                  <Input placeholder="خودروی بازرسی" />
                </div>
              </Col>
              <Col span={12}>
                <div className="mine_card">
                  <div className="mine_card_title">وضعیت فعالیت</div>
                  <Select defaultValue="فعال" style={{ width: "100%" }}>
                    <Option value="فعال">فعال</Option>
                    <Option value="غیرفعال">غیرفعال</Option>
                  </Select>
                </div>
              </Col>
            </Row>
          </Col>

          {/* Date and Time Range */}
          <Col span={24}>
            <Row gutter={16}>
              <Col span={12}>
                <div className="mine_card">
                  <div className="mine_card_title">
                    <CalendarOutlined style={{ marginRight: 8 }} />
                    تاریخ شروع و پایان
                  </div>
                  <RangePicker style={{ width: "100%" }} />
                </div>
              </Col>
              <Col span={12}>
                <div className="mine_card">
                  <div className="mine_card_title">
                    <ClockCircleOutlined style={{ marginRight: 8 }} />
                    ساعت شروع و پایان
                  </div>
                  <Row gutter={8}>
                    <Col span={12}>
                      <TimePicker
                        style={{ width: "100%" }}
                        placeholder="شروع"
                      />
                    </Col>
                    <Col span={12}>
                      <TimePicker
                        style={{ width: "100%" }}
                        placeholder="پایان"
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Col>

          {/* Notes */}
          <Col span={24}>
            <div className="mine_card">
              <div className="mine_card_title">توضیحات</div>
              <TextArea rows={4} placeholder="اضافه کردن توضیحات..." />
            </div>
          </Col>

          {/* Weekdays */}
          <Col span={12}>
            <div className="mine_card">
              <div className="mine_card_title">
                <CalendarOutlined style={{ marginRight: 8 }} />
                ایام هفته
              </div>
              <Checkbox.Group style={{ width: "100%" }}>
                <Row>
                  <Col span={8}>
                    <Checkbox value="شنبه">شنبه</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="یکشنبه">یکشنبه</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="دوشنبه">دوشنبه</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="سه‌شنبه">سه‌شنبه</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="چهارشنبه">چهارشنبه</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="پنجشنبه">پنجشنبه</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="جمعه">جمعه</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </div>
          </Col>

          {/* Months */}
          <Col span={12}>
            <div className="mine_card">
              <div className="mine_card_title">ماه‌های سال</div>
              <Checkbox.Group style={{ width: "100%" }}>
                <Row>
                  <Col span={8}>
                    <Checkbox value="فروردین">فروردین</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="اردیبهشت">اردیبهشت</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="خرداد">خرداد</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="تیر">تیر</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="مرداد">مرداد</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="شهریور">شهریور</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="مهر">مهر</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="آبان">آبان</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="آذر">آذر</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="دی">دی</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="بهمن">بهمن</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="اسفند">اسفند</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </div>
          </Col>

          {/* Cameras */}
          <Col span={24}>
            <div className="mine_card">
              <div className="mine_card_title">
                <CameraOutlined style={{ marginRight: 8 }} />
                دوربین مورد نظر
              </div>
              <Checkbox.Group style={{ width: "100%" }}>
                <Row>
                  <Col span={12}>
                    <Checkbox value="فردوسی به تختی">فردوسی به تختی</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="بلوار فاطمیه ثابت">
                      بلوار فاطمیه ثابت
                    </Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="میدان امام حسن">میدان امام حسن</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </div>
          </Col>
        </Row>

        {/* Action Buttons */}
        <Row justify="center" style={{ marginTop: "20px" }}>
          <Col>
            <Button type="primary" style={{ marginRight: "8px" }}>
              ثبت الگو
            </Button>
            <Button type="default">بازگشت</Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Olgo;
