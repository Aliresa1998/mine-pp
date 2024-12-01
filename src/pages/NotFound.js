import { Result } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <Result
        status="404"
        title="خطای 404 - صفحه پیدا نشد"
        subTitle="صفحه‌ای که به دنبال آن هستید پیدا نشد."
        extra={<NavLink to="/dashboard">بازگشت به داشبورد</NavLink>}
      />
    </div>
  );
};
export default NotFound;
