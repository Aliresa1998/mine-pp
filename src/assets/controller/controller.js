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

const createAttachment = async (data) => {
    const myHeaders = Object.assign(

        authHeader()
    );



    const req = new Request(
        config.apiGateway.URL + "customers/attachment-lc/",
        {
            body: data,
            method: "POST",
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

const createUser = async (data) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const raw = JSON.stringify(data);

    const req = new Request(
        config.apiGateway.URL + "dashboard/customer-lc/",
        {
            body: raw,
            method: "POST",
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

const uploadAttachment = async (data) => {
    const myHeaders = Object.assign(

        authHeader()
    );



    const req = new Request(
        config.apiGateway.URL + "order/create-attachment/",
        {
            body: data,
            method: "POST",
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

const createOrder = async (data) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const raw = JSON.stringify(data);

    const req = new Request(
        config.apiGateway.URL + "order/create-order/",
        {
            body: raw,
            method: "POST",
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

const sendFCMtoken = async (token) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const raw = JSON.stringify({
        token: token
    });

    const req = new Request(
        config.apiGateway.URL + "customers/save-fcm-token/",
        {
            body: raw,
            method: "POST",
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

const ChangePassword = async (data) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const raw = JSON.stringify(data);

    const req = new Request(
        config.apiGateway.URL + "dj-rest-auth/password/change/",
        {
            body: raw,
            method: "POST",
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

const changeCustomerPassword = async (data) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const raw = JSON.stringify(data);

    const req = new Request(
        config.apiGateway.URL + "dashboard/change-password/",
        {
            body: raw,
            method: "POST",
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

const createTol = async (data) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const raw = JSON.stringify(data);

    const req = new Request(
        config.apiGateway.URL + "dashboard/customer-tolerance-lc/",
        {
            body: raw,
            method: "POST",
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

const editUser = async (data, id) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const raw = JSON.stringify(data);

    const req = new Request(
        config.apiGateway.URL + "dashboard/customer-rud/" + id + "/",
        {
            body: raw,
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

const updatePrice = async (data, id) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const raw = JSON.stringify(data);

    const req = new Request(
        config.apiGateway.URL + "dashboard/price-rud/" + id + "/",
        {
            body: raw,
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

const approveOrderAdmin = async (id) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const raw = JSON.stringify({
        status: "confirmed"
    });

    const req = new Request(
        config.apiGateway.URL + "dashboard/order-rud/" + id + "/",
        {
            body: raw,
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

const declineOrderAdmin = async (id) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );

    const raw = JSON.stringify({
        status: "rejected"
    });

    const req = new Request(
        config.apiGateway.URL + "dashboard/order-rud/" + id + "/",
        {
            body: raw,
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

const Logout = async () => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },
        authHeader()
    );


    const req = new Request(
        config.apiGateway.URL + "dj-rest-auth/logout/",
        {
            method: "POST",
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

const readAttachmentList = async (page) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" }, authHeader()
    );
    const req = new Request(
        config.apiGateway.URL + "customers/attachment-lc/?page=" + page,
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
}

const readAttachmentListAdmin = async (page) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" }, authHeader()
    );
    const req = new Request(
        config.apiGateway.URL + "dashboard/attachment-list/?page=" + page,
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
}

const createOrderAdmin = async (data) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" }, authHeader()
    );

    const raw = JSON.stringify(data)

    const req = new Request(
        config.apiGateway.URL + "dashboard/create-order/",
        {
            body: raw,
            method: "POST",
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
}

const submitCustomerOffer = async (id) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" }, authHeader()
    );
    const req = new Request(
        config.apiGateway.URL + "order/submit-order/?order_id=" + id,
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
}

const changeBuy = async (swtich) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" }, authHeader()
    );
    const req = new Request(
        config.apiGateway.URL + "dashboard/buy-sell-controll/?status=" + swtich,
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
}

const changeAutoAccept = async (swtich) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" }, authHeader()
    );
    const req = new Request(
        config.apiGateway.URL + "dashboard/auto-accept/?status=" + swtich,
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
}

const changeHamta = async (swtich) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" }, authHeader()
    );
    const req = new Request(
        config.apiGateway.URL + "dashboard/hamta-switch/?switch=" + swtich,
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
}

const getConfig = async (id, page) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" }, authHeader()
    );
    const req = new Request(
        config.apiGateway.URL + "dashboard/get-config/",
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
}

const getTolerenceUser = async (id, page) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" }, authHeader()
    );
    const req = new Request(
        config.apiGateway.URL + "dashboard/customer-tolerance-lc/?page=" + page + "&customer_id=" + id,
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
}

const getDashboardSummury = async () => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" }, authHeader()
    );
    const req = new Request(
        config.apiGateway.URL + "dashboard/dashboard-summary/",
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
}

const getDashboardSummary = async () => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" }, authHeader()
    );
    const req = new Request(
        config.apiGateway.URL + "dashboard/dashboard-summary",
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
}

const getFullListOfPriceCustomer = async () => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" }, authHeader()
    );
    const req = new Request(
        config.apiGateway.URL + "price/list-prices/?page=0",
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
}

const getFullListOfPrice = async () => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" }, authHeader()
    );
    const req = new Request(
        config.apiGateway.URL + "dashboard/price-list/?page=0",
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
}

const getPriceList = async (page) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" }, authHeader()
    );
    const req = new Request(
        config.apiGateway.URL + "dashboard/price-list/?page=" + page,
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
}

const getCustomerOrderListToday = async (page, date) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" }, authHeader()
    );
    const req = new Request(
        config.apiGateway.URL + "order/list-order/?page=" + page + "&date_created=" + date,
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
}

const getCustomerOrderList = async (page) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" }, authHeader()
    );
    const req = new Request(
        config.apiGateway.URL + "order/list-order/?page=" + page,
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
}

const getCustmoerList = async (page, filter) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" }, authHeader()
    );
    const req = new Request(
        config.apiGateway.URL + "dashboard/customer-lc/?page=" + page
        + "&phone_number=" + (filter.phone ? filter.phone : "") + "&username=" + (filter.name ? filter.name : "")
        ,
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
}

const getOrderListAdmin = async (page, filter) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" }, authHeader()
    );
    const req = new Request(
        config.apiGateway.URL + "dashboard/order-list/?page=" + page
        + "&customer=" + (filter.customer ? filter.customer : "")
        + "&price_snapshot__item=" + (filter.item ? filter.item : "")
        + "&status=" + (filter.status ? filter.status : "")
        + "&date_created=" + (filter.date_created ? filter.date_created : "")
        + "&price_snapshot__price_type=" + (filter.type ? filter.type : "")

        ,
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
}

const checkAdminUser = async () => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" }, authHeader()
    );
    const req = new Request(
        config.apiGateway.URL + "accounts/check-user/",
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
}

const Login = async (data) => {
    const myHeaders = Object.assign(
        { "Content-Type": "application/json" },

    );

    const raw = JSON.stringify(data)

    const req = new Request(
        config.apiGateway.URL + "dj-rest-auth/login/",
        {
            body: raw,
            method: "POST",
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


const deleteCustomer = async (id) => {
    const myHeaders = Object.assign(authHeader());
    var url = "";
    url =
        config.apiGateway.URL +
        "dashboard/customer-rud/" +
        id + "/"


    const req = new Request(url, {
        method: "DELETE",
        headers: myHeaders,
    });

    const response = await fetch(req);

    if (response.status > 250) {
        const json = await response.json();
        const res = {
            json: json,
            status: response.status,
            message: response.message,
        };


        return res;
    } else {
        const res = {
            json: { message: "succssfull" },
            status: 204,
            message: "Service deleted successfully",
        };

        return res;
    }
};

const deleteTol = async (id) => {
    const myHeaders = Object.assign(authHeader());
    var url = "";
    url =
        config.apiGateway.URL +
        "dashboard/customer-tolerance-rud/" +
        id + "/"


    const req = new Request(url, {
        method: "DELETE",
        headers: myHeaders,
    });

    const response = await fetch(req);

    if (response.status > 250) {
        const json = await response.json();
        const res = {
            json: json,
            status: response.status,
            message: response.message,
        };


        return res;
    } else {
        const res = {
            json: { message: "succssfull" },
            status: 204,
            message: "Service deleted successfully",
        };

        return res;
    }
};

export const controller = {
    Login,
    Logout,
    checkAdminUser,
    getCustmoerList,
    createUser,
    editUser,
    deleteCustomer,
    getOrderListAdmin,
    approveOrderAdmin,
    getTolerenceUser,
    deleteTol,
    createTol,
    getFullListOfPrice,
    getFullListOfPriceCustomer,
    declineOrderAdmin,
    getPriceList,
    updatePrice,
    ChangePassword,
    getCustomerOrderList,
    sendFCMtoken,
    createOrder,
    uploadAttachment,
    changeCustomerPassword,
    getDashboardSummary,
    getConfig,
    changeHamta,
    changeBuy,
    changeAutoAccept,
    submitCustomerOffer,
    readAttachmentList,
    createAttachment,
    readAttachmentListAdmin,
    getCustomerOrderListToday,
    createOrderAdmin
}