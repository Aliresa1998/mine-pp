import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/images/unnamed.png";
import { Col, message, Row } from "antd";
import moment from "moment-jalaali";
import { controller } from "../../assets/controller/controller";

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
const SideBar = () => {
  const [slectedItem, setslectedItem] = useState("1");
  const [time, setTime] = useState({
    date: moment().format("dddd jD jMMMM jYYYY"),
    clock: moment().format("HH:mm"),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime({
        date: moment().format("dddd jD jMMMM jYYYY"),
        clock: moment().format("HH:mm"),
      });
    }, 1000); // Update every second for the clock

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);
    if (pathname == "/persons-cars") {
      setslectedItem("2");
    } else if (pathname == "/pattern") {
      setslectedItem("3");
    } else if (pathname == "/groups") {
      setslectedItem("4");
    } else if (pathname == "/trafic") {
      setslectedItem("5");
    } else {
      setslectedItem("1");
    }
  }, [pathname]);

  const handleExit = async () => {
    try {
      const response = await controller.logOut();
      window.location.href = "/sign-in";
      localStorage.clear();
    } catch (e) {
      message.error("خطا در برقراری ارتباط با سرور");
    }
  };

  return (
    <>
      <Col>
        <div className="sidebar">
          <div>
            <img src={Logo} alt="logo" width={200} />
            <Row justify={"center"}>
              <span style={{ color: "#2370c0", fontSize: "14px" }}>
                {time.date}
              </span>{" "}
              <br />
              <br />
            </Row>
            <Row justify={"center"}>
              <span
                style={{
                  color: "#2370c0",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {time.clock}
              </span>
            </Row>
          </div>

          <br />
          <br />
          <br />
        </div>

        <div
          className="sideNavBar"
          onClick={() => {
            setslectedItem("1");
          }}
        >
          <NavLink to="/dashboard">
            <div
              className={slectedItem == "1" ? "slectedItem" : "unslectedItem"}
            >
              جستجو و مانیتورینگ معادن
            </div>
          </NavLink>
          <hr />
          <NavLink to="/persons-cars">
            <div
              className={slectedItem == "2" ? "slectedItem" : "unslectedItem"}
            >
              افراد و خودروها
            </div>
          </NavLink>
          <hr />
          {/* <NavLink to="/pattern">
            <div
              className={slectedItem == "3" ? "slectedItem" : "unslectedItem"}
            >
              الگو و مجوزهای تردد
            </div>
          </NavLink>
          <hr /> */}
          <NavLink to="/groups">
            <div
              className={slectedItem == "4" ? "slectedItem" : "unslectedItem"}
            >
              گروه ها و سازمان ها
            </div>
          </NavLink>
          <hr />
          <NavLink to="/trafic">
            <div
              className={slectedItem == "5" ? "slectedItem" : "unslectedItem"}
            >
              مدیریت تردد ها
            </div>
          </NavLink>
          <hr />
          <div className={slectedItem == "6" ? "slectedItem" : "unslectedItem"}>
            تنظیمات
          </div>
          <hr />
          <div className={slectedItem == "7" ? "slectedItem" : "unslectedItem"}>
            تماس و پشتیبانی
          </div>
          <hr />
          <div className="unslectedItem" onClick={handleExit}>
            خروج
          </div>
        </div>
      </Col>
    </>
  );
};

export default SideBar;
