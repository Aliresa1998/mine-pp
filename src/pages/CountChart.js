import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { controller } from "../assets/controller/controller";
import moment from "moment-jalaali";

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
const DailyCountChart = () => {
  // Sample data
  const [data, setData] = useState([
    { date: "2024-12-14", count: "4" },
    { date: "2024-12-13", count: "8" },
    { date: "2024-12-12", count: "2" },
  ]);

  // Transform data for the chart
  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: data.map((item) =>
        moment(item.date, "YYYY-MM-DD").format("jYYYY/jMM/jDD")
      ),
      title: {
        text: "",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
    },
    yaxis: {
      title: {
        text: "",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
      min: 0,
    },
    tooltip: {
      enabled: true,
      x: {
        format: "yyyy-MM-dd",
      },
    },
    title: {
      text: "تردد ماهانه",
      align: "center",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
    colors: ["#00E396"],
    markers: {
      size: 5,
      colors: ["#00E396"],
      strokeColors: "#fff",
      strokeWidth: 2,
    },
  };

  const series = [
    {
      name: "Count",
      data: data.map((item) => parseInt(item.count, 10)),
    },
  ];

  function getDates() {
    // Get the current date
    let currentDate = new Date();
    let currentDateString = currentDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD

    // Get the date 30 days ago
    let pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 10);
    let pastDateString = pastDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD

    var dates = {
      currentDateString: currentDateString,
      pastDateString: pastDateString,
    };

    return dates;
  }

  const fetchChartData = async () => {
    console.log(getDates());
    const response = await controller.readDailyTraffic(
  
      getDates().pastDateString,
      getDates().currentDateString
    );

    setData(response.json.daily_traffic);
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <div>
      <Chart options={chartOptions} series={series} type="line" height={350} />
    </div>
  );
};

export default DailyCountChart;
