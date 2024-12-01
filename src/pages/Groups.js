import React from "react";
import { Table, Button, Input, Pagination } from "antd";
import { EditOutlined, DeleteOutlined, TeamOutlined } from "@ant-design/icons";

const GroupManagement = () => {
  const data = [
    {
      key: "1",
      groupTitle: "تیم پشتیبانی",
      parentGroup: " ",
      members: " ",
    },
    {
      key: "2",
      groupTitle: "واحد بازرسی",
      parentGroup: " ",
      members: " ",
    },
    {
      key: "3",
      groupTitle: "واحد حراست سازمان",
      parentGroup: " ",
      members: " ",
    },
  ];

  const columns = [
    {
      title: "ردیف",
      dataIndex: "key",
      key: "key",
      width: "10%",
    },
    {
      title: "عنوان گروه",
      dataIndex: "groupTitle",
      key: "groupTitle",
    },
    {
      title: "عنوان مجموعه بالادست",
      dataIndex: "parentGroup",
      key: "parentGroup",
    },
    {
      title: "نفرات",
      dataIndex: "members",
      key: "members",
      render: () => <span>•</span>,
    },
    {
      title: "عملیات",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            type="primary"
            icon={<TeamOutlined />}
            style={{ marginRight: "8px" }}
          >
            مدیریت اعضا
          </Button>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            style={{ marginRight: "8px" }}
          >
            حذف
          </Button>
          <Button type="default" icon={<EditOutlined />}>
            ویرایش
          </Button>
        </div>
      ),
    },
  ];

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
          <Input placeholder="جستجو:" style={{ width: "200px" }} />
          <Button
            type="primary"
            style={{ backgroundColor: "green", color: "white" }}
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
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <Pagination
            defaultCurrent={1}
            total={3}
            pageSize={10}
            showSizeChanger={false}
            simple
          />
        </div>
      </div>
    </div>
  );
};

export default GroupManagement;
