import config from "./config";

function authHeader() {
  let user = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczNzEzNTQ4MCwianRpIjoiYTQ4NTIwODQtYjU2OC00OGY4LThjNjUtMWRlY2M1YzBmNTg1IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImFkbWluIiwibmJmIjoxNzM3MTM1NDgwLCJjc3JmIjoiZDM1NGJkYzctYTE1NC00YjRhLWJmYjctZjNhNzgyYTVhMDU5IiwiZXhwIjoxNzM3MzA4MjgwfQ.MgTD1t4057iDJROW4K3wmnzqQY62ayIfM6_34HKeFoI";
  if (user) {
    if (user) {
      return { Authorization: "Bearer  " + user };
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

const readPlates = async (page, filter) => {
  const myHeaders = Object.assign(authHeader());
  var filters = "";

  if (filter.mine_name) {
    filters += "&mine_name=" + filter.mine_name;
  }

  if (filter.permit) {
    filters += "&permit=" + filter.permit;
  }

  if (filter.predicted_string) {
    filters += "&predicted_string=" + filter.predicted_string;
  }

  if (filter.starttime) {
    filters += "&starttime=" + filter.starttime;
  }

  if (filter.endtime) {
    filters += "&endtime=" + filter.endtime;
  }

  const req = new Request(
    config.apiGateway.URL + "/plates?page=" + page + filters,
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

const signIn = async (data) => {
  const myHeaders = Object.assign({
    "Content-Type": "application/json",
  });


  const req = new Request(config.apiGateway.URL + "/signin", {
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

  signIn
};
