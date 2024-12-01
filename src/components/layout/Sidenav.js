import { Menu, Row } from "antd";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { controller } from "../../assets/controller/controller";
import logo from "../../assets/images/logo.png";
import { PopupMessage } from "../PopupMessage";

import { ScheduleOutlined, SettingOutlined, SolutionOutlined, LockOutlined, BookOutlined, ShoppingCartOutlined } from "@ant-design/icons"
function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");
  const [isAdmin, setIsAdmin] = useState("loading");
  const dashboard = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill={color}
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const tables = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const billing = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M4 4C2.89543 4 2 4.89543 2 6V7H18V6C18 4.89543 17.1046 4 16 4H4Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 9H2V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V9ZM4 13C4 12.4477 4.44772 12 5 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H5C4.44772 14 4 13.5523 4 13ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H10C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12H9Z"
        fill={color}
      ></path>
    </svg>,
  ];
  const exitIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M18.3 5.3l-1.4-1.4L12 10.2 7.1 4.3 5.7 5.7 10.6 10.6 5.7 15.5 7.1 16.9 12 12l4.9 4.9 1.4-1.4L13.4 12 18.3 7.1z" />
    </svg>
  );

  const ordersIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M21 3H3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z" />
    </svg>
  );

  const dollarIcon = (
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={1}
    >
      <path
        d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM10 18.75C5.02944 18.75 1.25 14.9706 1.25 10C1.25 5.02944 5.02944 1.25 10 1.25C14.9706 1.25 18.75 5.02944 18.75 10C18.75 14.9706 14.9706 18.75 10 18.75Z"
        fill="#fff"
      ></path>
      <path
        d="M10 6C9.44772 6 9 6.44772 9 7V11C9 11.5523 9.44772 12 10 12C10.5523 12 11 11.5523 11 11V7C11 6.44772 10.5523 6 10 6Z"
        fill="#fff"
      ></path>
    </svg>
  );

  const passwordIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path fill="currentColor" d="M17,9V6c0-3.313-2.687-6-6-6S5,2.687,5,6v3H4c-1.104,0-2,0.896-2,2v11c0,1.104,0.896,2,2,2h16c1.104,0,2-0.896,2-2V11c0-1.104-0.896-2-2-2H17z M7,6c0-2.206,1.794-4,4-4s4,1.794,4,4v3H7V6z" />
    </svg>
  );

  const rtl = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 6C3 4.34315 4.34315 3 6 3H16C16.3788 3 16.725 3.214 16.8944 3.55279C17.0638 3.89157 17.0273 4.29698 16.8 4.6L14.25 8L16.8 11.4C17.0273 11.703 17.0638 12.1084 16.8944 12.4472C16.725 12.786 16.3788 13 16 13H6C5.44772 13 5 13.4477 5 14V17C5 17.5523 4.55228 18 4 18C3.44772 18 3 17.5523 3 17V6Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const customerIcon = (
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
        fill="#fff"
      ></path>
      <path
        d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
        fill="#fff"
      ></path>
      <path
        d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
        fill="#fff"
      ></path>
      <path
        d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
        fill="#fff"
      ></path>
    </svg>
  );



  const profile = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const signin = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const settingsIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14h2v6h-2zm0 8h2v2h-2z" />
    </svg>
  );

  const signup = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      key={0}
    >
      <path
        d="M0,2A2,2,0,0,1,2,0H8a2,2,0,0,1,2,2V8a2,2,0,0,1-2,2H2A2,2,0,0,1,0,8Z"
        transform="translate(4 4)"
        fill={color}
      />
      <path
        d="M2,0A2,2,0,0,0,0,2V8a2,2,0,0,0,2,2V4A2,2,0,0,1,4,2h6A2,2,0,0,0,8,0Z"
        fill={color}
      />
    </svg>,
  ];

  const handleClickLogout = async () => {

    try {
      const response = await controller.Logout()
      PopupMessage.openNotification(
        "bottom",
        "خروج موفقیت آمیز",
        "Successful"
      )
      localStorage.clear();

    } catch (e) {
      PopupMessage.openNotification(
        "bottom",
        "خطا در برقراری ارتباط",
        "Error"
      )
    }
  }

  const checkAdminUser = async () => {
    const responseCheckUser = await controller.checkAdminUser();

    if (responseCheckUser.json.detail) {
      setIsAdmin(true)
      localStorage.setItem("isAdmin", "true")
    } else {
      setIsAdmin(false)
      localStorage.setItem("isAdmin", "false")
    }
  }

  useState(() => {
    checkAdminUser();
  }, [])

  const checkToken = async (token) => {
    const response = await controller.sendFCMtoken(token);
  }

  return (
    <>
    

      <Row type="flex" justify="center">
        <img src={logo} alt="" width={80} />
      </Row>
      <hr />
      {
        localStorage.getItem("isAdmin") == "true" ?
          <Menu theme="light" mode="inline">

            <Menu.Item key="1">
              <NavLink to="/dashboard">
                <span
                  className="icon"
                  style={{
                    background: page === "dashboard" ? color : "",
                  }}
                >
                  {dashboard}
                </span>
                <span style={{ marginRight: "8px" }} className="label">داشبورد</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="customer">
              <NavLink to="/customer-management">
                <span
                  className="icon"
                  style={{
                    background: page === "customer-management" ? color : "",
                  }}
                >
                  {customerIcon}
                </span>
                <span style={{ marginRight: "8px" }} className="label">مشتریان</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/order-management">

                <div
                  className="icon"
                  style={{
                    background: page === "order-management" ? color : "",
                    display: "flex",
                    justifyContent: "center",
                    paddingRight: "6px"
                  }}
                >

                  <ScheduleOutlined style={{ fontSize: "20px", color: page != "order-management" ? "#BFBFC0" : "#FFF" }} />

                </div>
                <span style={{ marginRight: "8px" }} className="label">سفارشات</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="price">
              <NavLink to="/price">
                <span
                  className="icon"
                  style={{
                    background: page === "price" ? color : "",
                  }}
                >
                  <span style={{ fontSize: "20px", color: page != "price" ? "#BFBFC0" : "#FFF" }}>$</span>
                </span>
                <span style={{ marginRight: "8px" }} className="label">نرخ</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/report">
                <div
                  className="icon"
                  style={{
                    background: page === "report" ? color : "",
                    display: "flex",
                    justifyContent: "center",
                    paddingRight: "6px"
                  }}
                >

                  <SolutionOutlined style={{ fontSize: "20px", color: page != "customer-create-order" ? "#BFBFC0" : "#FFF" }} />

                </div>
                <span style={{ marginRight: "8px" }} className="label">گزارشات</span>
              </NavLink>
            </Menu.Item>

            <Menu.Item key="setting">
              <NavLink to="/setting">
                <div
                  className="icon"
                  style={{
                    background: page === "setting" ? color : "",
                    display: "flex",
                    justifyContent: "center",
                    paddingRight: "6px"
                  }}
                >

                  <SettingOutlined style={{ fontSize: "20px", color: page != "setting" ? "#BFBFC0" : "#FFF" }} />
                </div>

                <span style={{ marginRight: "8px" }} className="label">تنظیمات</span>
              </NavLink>
            </Menu.Item>

            <Menu.Item key="3">
              <NavLink to="/change-password">
                <div
                  className="icon"
                  style={{
                    background: page === "change-password" ? color : "",
                    display: "flex",
                    justifyContent: "center",
                    paddingRight: "6px"
                  }}
                >

                  <LockOutlined style={{ fontSize: "20px", color: page != "customer-create-order" ? "#BFBFC0" : "#FFF" }} />

                </div>
                <span style={{ marginRight: "8px" }} className="label">تغییر رمز عبور</span>
              </NavLink>
            </Menu.Item>

            <Menu.Item key="5">
              <NavLink to="/sign-in" onClick={handleClickLogout}>
                <span
                  className="icon"
                  style={{
                    background: page === "rtl" ? color : "",
                  }}
                >
                  {exitIcon}
                </span>
                <span style={{ marginRight: "8px" }} className="label">خروج</span>
              </NavLink>

            </Menu.Item>
          </Menu>
          :
          <Menu theme="light" mode="inline">

            <Menu.Item key="1">
              <NavLink to="/customer-order-list">
                <div
                  className="icon"
                  style={{
                    background: page === "customer-order-list" ? color : "",
                    display: "flex",
                    justifyContent: "center",
                    paddingRight: "6px"
                  }}
                >

                  <BookOutlined style={{ fontSize: "20px", color: page != "customer-create-order" ? "#BFBFC0" : "#FFF" }} />

                </div>
                <span style={{ marginRight: "8px" }} className="label">سفارشات</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/customer-create-order">
                <div
                  className="icon"
                  style={{
                    background: page === "customer-create-order" ? color : "",
                    display: "flex",
                    justifyContent: "center",
                    paddingRight: "6px"
                  }}
                >

                  <ShoppingCartOutlined style={{ fontSize: "20px", color: page != "customer-create-order" ? "#BFBFC0" : "#FFF" }} />

                </div>

                <span style={{ marginRight: "8px" }} className="label">ثبت سفارش</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/customer-report">
                <div
                  className="icon"
                  style={{
                    background: page === "customer-report" ? color : "",
                    display: "flex",
                    justifyContent: "center",
                    paddingRight: "6px"
                  }}
                >

                  <SolutionOutlined style={{ fontSize: "20px", color: page != "customer-create-order" ? "#BFBFC0" : "#FFF" }} />

                </div>
                <span style={{ marginRight: "8px" }} className="label">گزارشات</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/change-password">
                <div
                  className="icon"
                  style={{
                    background: page === "change-password" ? color : "",
                    display: "flex",
                    justifyContent: "center",
                    paddingRight: "6px"
                  }}
                >

                  <LockOutlined style={{ fontSize: "20px", color: page != "customer-create-order" ? "#BFBFC0" : "#FFF" }} />

                </div>

                <span style={{ marginRight: "8px" }} className="label">تغییر رمز عبور</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="5">
              <NavLink to="/sign-in" onClick={handleClickLogout}>
                <span
                  className="icon"
                  style={{
                    background: page === "rtl" ? color : "",
                  }}
                >
                  {exitIcon}
                </span>
                <span style={{ marginRight: "8px" }} className="label">خروج</span>
              </NavLink>
            </Menu.Item>
          </Menu>
      }

    </>
  );
}

export default Sidenav;