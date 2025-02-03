import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  Space,
  message,
} from "antd";
import { controller } from "../assets/controller/controller";

const User = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  const showAddModal = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (record) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (record) => {
    console.log(record);
    try {
      const response = await controller.handleDeleteUser(record.username);
      if (response.status < 250) {
        message.success("کاربر با موفقیت حذف شد.");
      } else {
        message.error("خطا در حذف کاربر." + JSON.stringify(response.json));
      }
    } catch (e) {
      message.error("خطا در ارتباط با سرور.");
    }
    handleReadUsers();
  };

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async () => {
    setLoading(true);
    form.validateFields().then(async (values) => {
      if (editingUser) {
        try {
          const response = await controller.updateUser(
            values,
            editingUser.username
          );
          if (response.status < 250) {
            message.success("کاربر با موفقیت ویرایش شد.");
          } else {
            message.error(JSON.stringify(response.json));
          }
          handleReadUsers();
        } catch (e) {
          message.error("خطا در ارتباط با سرور.");
        }
      } else {
        try {
          const response = await controller.signUp(values);
          if (response.status < 250) {
            message.success("کاربر جدید با موفقیت اضافه شد.");
          } else {
            message.error(JSON.stringify(response.json));
          }
          handleReadUsers();
        } catch (e) {
          message.error("خطا در ارتباط با سرور.");
        }
      }
      setIsModalVisible(false);
    });
    setLoading(false);
  };

  const columns = [
    {
      title: "نام کاربری",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "رمز عبور",
      dataIndex: "password",
      key: "password",
      render: () => "******",
    },
    {
      title: "عملیات",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => showEditModal(record)}>
            ویرایش
          </Button>
          <Popconfirm
            title="آیا از حذف این کاربر مطمئن هستید؟"
            onConfirm={() => handleDelete(record)}
            okText="بله"
            cancelText="خیر"
          >
            <Button type="link" danger>
              حذف
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleReadUsers = async () => {
    const response = await controller.readUsers();
    setUsers(response.json);
  };

  useEffect(() => {
    handleReadUsers();
  }, []);

  return (
    <div style={{ width: "100%" }} className="mine_card">
      <div className="mine_card_title">مدیریت ترددها</div>
      <div style={{ padding: 20 }}>
        <Button
          type="primary"
          onClick={showAddModal}
          style={{ marginBottom: 20 }}
        >
          افزودن کاربر
        </Button>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="key"
          pagination={false}
        />

        <Modal
          title={editingUser ? "ویرایش کاربر" : "افزودن کاربر"}
          visible={isModalVisible}
          onCancel={handleCancel}
          onOk={handleFormSubmit}
          loading={loading}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="username"
              label="نام کاربری"
              rules={[
                { required: true, message: "لطفاً نام کاربری را وارد کنید!" },
              ]}
            >
              <Input placeholder="نام کاربری" />
            </Form.Item>
            <Form.Item
              name="password"
              label="رمز عبور"
              rules={[
                {
                  required: editingUser ? false : true,
                  message: "لطفاً رمز عبور را وارد کنید!",
                },
              ]}
            >
              <Input.Password
                autoComplete="new-password"
                placeholder="رمز عبور"
              />
              {editingUser && (
                <span style={{ color: "red", fontSize: "11px" }}>
                  * برای عدم بروز رسانی رمز عبور مقدار فیلد رمز عبور را خالی بگذارید.
                </span>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default User;
