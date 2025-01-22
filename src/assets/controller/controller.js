import config from "./config";

function authHeader() {
  let user = localStorage.getItem("user");
  if (user) {
    if (user) {
      return { Authorization: "Bearer  " + user };
    }
  } else {
    return {};
  }
}

const readMines = async (searchText) => {
  const myHeaders = Object.assign(authHeader());

  const req = new Request(
    config.apiGateway.URL + `/mine${searchText ? "?search=" + searchText : ""}`,
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

const readOrgans = async (search) => {
  const myHeaders = Object.assign(authHeader());

  
  const req = new Request(
    config.apiGateway.URL + `/organizations?page=0${search ? "&search=" + search : ""}`,
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

const deleteItem = async (data) => {
  const myHeaders = Object.assign(authHeader(), {
    "Content-Type": "application/json",
  });

  const req = new Request(config.apiGateway.URL + "/organizations/" + data, {
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

  const req = new Request(config.apiGateway.URL + "/vehicle/" + data, {
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

const logOut = async () => {
  const myHeaders = Object.assign(authHeader(), {
    "Content-Type": "application/json",
  });

  const req = new Request(config.apiGateway.URL + "/signout", {
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

const createOrgan = async (payload) => {
  const myHeaders = Object.assign(authHeader(), {
    "Content-Type": "application/json",
  });

  const req = new Request(config.apiGateway.URL + "/organizations", {
    body: JSON.stringify(payload),
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

  signIn,
  logOut,

  readOrgans,
  createOrgan,
  deleteItem
};
