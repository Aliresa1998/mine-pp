import React, { useEffect, useState } from "react";
import { Table, Button, Input, Modal, Form, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { controller } from "../assets/controller/controller";

const GroupManagement = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [editingRecord, setEditingRecord] = useState(null);

  const columns = [
    {
      title: "ردیف",
      dataIndex: "key",
      key: "key",
      width: "10%",
      render: (_, record, index) => index + 1,
    },
    {
      title: "عنوان گروه",
      dataIndex: "organization_name",
      key: "organization_name",
    },
    {
      title: "نفرات",
      dataIndex: "members",
      key: "members",
      render: (_, record) => (
        <span>
          {record.members && record.members.length > 0
            ? record.members.length
            : "-"}
        </span>
      ),
    },
    {
      title: "عملیات",
      key: "actions",
      render: (_, record) => (
        <div>
          <Popconfirm
            title="آیا از حذف این گروه مطمئن هستید؟"
            onConfirm={() => handleDelete(record.organization_id)}
            okText="بله"
            cancelText="خیر"
          >
            <Button
              style={{ color: "red", border: "1px solid red" }}
              type="danger"
              icon={<DeleteOutlined style={{ color: "red" }} />}
            >
              حذف
            </Button>
          </Popconfirm>

          <Button
            style={{ marginRight: "8px" }}
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            ویرایش
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      const response = await controller.deleteItem(id);
      if (response.status < 250) {
        message.success("ارگان با موفقیت حذف شد");
        fetchData();
      }
    } catch (e) {
      message.error("خطا در برقراری ارتباط");
    }
  };

  const fetchData = async () => {
    const response = await controller.readOrgans(search);
    if (response?.json?.organizations) {
      setData(response.json.organizations);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  
  useEffect(()=>{
    fetchData()
  },[search])

  const showModal = () => {
    setIsModalVisible(true);
    setEditingRecord(null);
    setGroupName("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setGroupName("");
    setEditingRecord(null);
  };

  const handleOk = async () => {
    if (!groupName.trim()) {
      message.error("لطفاً نام گروه را وارد کنید.");
      return;
    }

    try {
      if (editingRecord) {
        // Update existing record
        const myPayload = {
          organization_id: editingRecord.organization_id,
          organization_name: groupName,
        };
        const response = await controller.updateOrgan(myPayload);
        if (response.status < 250) {
          message.success(`گروه "${groupName}" با موفقیت ویرایش شد.`);
        } else {
          message.error("خطا در ویرایش گروه");
        }
      } else {
        // Create new record
        const response = await controller.createOrgan({
          organization_name: groupName,
        });
        if (response.status < 250) {
          message.success(`گروه "${groupName}" با موفقیت اضافه شد.`);
        } else {
          message.error("خطا در ایجاد گروه، اسامی گروه باید یکتا باشد");
        }
      }

      setIsModalVisible(false);
      setGroupName("");
      fetchData();
    } catch (e) {
      message.error("خطا در ارتباط با سرور");
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setGroupName(record.organization_name);
    setIsModalVisible(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ width: "100%" }} className="mine_card">
      <div className="mine_card_title">مدیریت گروه‌ها</div>
      <div style={{ padding: "20px" }}>
        <div
          style={{
            marginBottom: "16px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Input
            value={search}
            placeholder="جستجو:"
            style={{ width: "200px" }}
            onChange={handleSearch}
          />
          <Button
            type="primary"
            style={{ backgroundColor: "green", color: "white" }}
            onClick={showModal}
          >
            افزودن گروه
          </Button>
        </div>
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          bordered
          style={{ backgroundColor: "white" }}
        />
      </div>

      <Modal
        title={editingRecord ? "ویرایش گروه" : "افزودن گروه جدید"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="ثبت"
        cancelText="لغو"
      >
        <Form>
          <Form.Item
            label="نام گروه"
            rules={[
              { required: true, message: "لطفاً نام گروه را وارد کنید." },
            ]}
          >
            <Input
              value={groupName}
              placeholder="نام گروه را وارد کنید"
              onChange={(e) => setGroupName(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GroupManagement;
