import config from "./config";

function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    if (user.key) {
      return { Authorization: "Token  " + user.key };
    } else {
      return {};
    }
  } else {
    return {};
  }
}

const readMines = async () => {
  const myHeaders = Object.assign(authHeader());

  const req = new Request(config.apiGateway.URL + "/mine", {
    method: "GET",
    headers: myHeaders,
  });
  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const readDailyTraffic = async (date1, date2) => {
  const myHeaders = Object.assign(authHeader());

  const req = new Request(
    config.apiGateway.URL + "/daily_traffic?time1=" + date1 + "&time2=" + date2,
    {
      method: "GET",
      headers: myHeaders,
    }
  );
  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const readPlates = async (page) => {
  const myHeaders = Object.assign(authHeader());

  const req = new Request(config.apiGateway.URL + "/plates?page=" + page, {
    method: "GET",
    headers: myHeaders,
  });
  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const readVehicles = async () => {
  const myHeaders = Object.assign(authHeader());

  const req = new Request(config.apiGateway.URL + "/vehicle?page=0", {
    method: "GET",
    headers: myHeaders,
  });
  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const removePlateTreffic = async (data) => {
  const myHeaders = Object.assign(authHeader(), {
    "Content-Type": "application/json",
  });

  const req = new Request(config.apiGateway.URL + "/plates/" + data.id, {
    method: "DELETE",
    headers: myHeaders,
  });
  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const editTerraficPlate = async (data) => {
  const myHeaders = Object.assign(authHeader(), {
    "Content-Type": "application/json",
  });

  const req = new Request(config.apiGateway.URL + "/plates/" + data.id, {
    body: JSON.stringify(data),
    method: "PATCH",
    headers: myHeaders,
  });
  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const editCar = async (data) => {
  const myHeaders = Object.assign(authHeader(), {
    "Content-Type": "application/json",
  });
  data["plate_id"] = data["license_plate"];

  const req = new Request(config.apiGateway.URL + "/vehicle", {
    body: JSON.stringify(data),
    method: "PATCH",
    headers: myHeaders,
  });
  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const addCar = async (data) => {
  const myHeaders = Object.assign(authHeader(), {
    "Content-Type": "application/json",
  });
  data["plate_id"] = data["license_plate"];

  const req = new Request(config.apiGateway.URL + "/vehicle", {
    body: JSON.stringify(data),
    method: "POST",
    headers: myHeaders,
  });
  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const deleteCar = async (data) => {
  const myHeaders = Object.assign(authHeader(), {
    "Content-Type": "application/json",
  });

  const req = new Request(config.apiGateway.URL + "/vehicle/?id=" + data, {
    method: "DELETE",
    headers: myHeaders,
  });
  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json: json,
    status: response.status,
    message: response.message,
  };

  return res;
};

export const controller = {
  readMines,
  readDailyTraffic,
  readVehicles,
  addCar,
  editCar,
  deleteCar,
  readPlates,

  editTerraficPlate,
  removePlateTreffic,
};
