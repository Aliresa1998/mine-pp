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

function checkStatus(status) {
  // console.log(status);
  if (status == 403) {
    localStorage.clear();
    window.location.href = "/";
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
  checkStatus(response.status);
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
    filters += "&time1=" + filter.starttime;
  }

  if (filter.endtime) {
    filters += "&time2=" + filter.endtime;
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

const readUsers = async (search) => {
  const myHeaders = Object.assign(authHeader());

  const req = new Request(config.apiGateway.URL + `/user`, {
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
    config.apiGateway.URL +
      `/organizations?page=0${search ? "&search=" + search : ""}`,
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

const handleDeleteUser = async (data) => {
  const myHeaders = Object.assign(authHeader(), {
    "Content-Type": "application/json",
  });

  const req = new Request(config.apiGateway.URL + "/user/" + data, {
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

const deleteMine = async (id) => {
  const myHeaders = Object.assign(authHeader(), {
    "Content-Type": "application/json",
  });

  const req = new Request(config.apiGateway.URL + "/mine/" + id, {
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

const updateUser = async (data, prevUsername) => {
  const myHeaders = Object.assign(authHeader(), {
    "Content-Type": "application/json",
  });
  var payload = {
    username: data.username,
  };

  if (data.password) {
    payload["password"] = data.password;
  }
  const req = new Request(config.apiGateway.URL + "/user/" + prevUsername, {
    body: JSON.stringify(payload),
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

  const req = new Request(
    config.apiGateway.URL + "/vehicle/" + data.vehicle_id,
    {
      body: JSON.stringify(data),
      method: "PATCH",
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

const updateMine = async (id, data) => {
  const myHeaders = Object.assign(authHeader(), {
    "Content-Type": "application/json",
  });

  const req = new Request(config.apiGateway.URL + "/mine/" + id, {
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

const createMine = async (data) => {
  const myHeaders = Object.assign(authHeader(), {
    "Content-Type": "application/json",
  });

  const req = new Request(config.apiGateway.URL + "/mine", {
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

const signUp = async (data) => {
  const myHeaders = Object.assign(authHeader(), {
    "Content-Type": "application/json",
  });

  const req = new Request(config.apiGateway.URL + "/signup", {
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

const updateOrgan = async (payload) => {
  const myHeaders = Object.assign(authHeader(), {
    "Content-Type": "application/json",
  });

  const req = new Request(
    config.apiGateway.URL + `/organizations/${payload.organization_id}`,
    {
      body: JSON.stringify(payload),
      method: "PATCH",
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
  deleteItem,
  updateOrgan,

  readUsers,
  signUp,
  handleDeleteUser,
  updateUser,

  deleteMine,
  createMine,
  updateMine,
};
