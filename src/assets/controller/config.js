const local = {
  apiGateway: {
    URL: "http://5.10.248.37:5000",
  },
  mediaGateway: {
    URL: "http://5.10.248.37:5000",
  },
  stripe: {
    key: "pk_test_Osu2iYG3m8zmTD1xI1vljmJN00jDeQAy6a",
  },
};

const staging = {
  apiGateway: {
    URL: "http://5.10.248.37:5000",
  },
  mediaGateway: {
    URL: "http://5.10.248.37:5000",
  },
  stripe: {
    key: "pk_test_Osu2iYG3m8zmTD1xI1vljmJN00jDeQAy6a",
  },
};

const production = {
  apiGateway: {
    URL: "http://5.10.248.37:5000",
  },
  mediaGateway: {
    URL: "http://5.10.248.37:5000",
  },
  stripe: {
    URL: "http://5.10.248.37:5000",
  },
};

const config =
  process.env.REACT_APP_DEPLOYMENT === "production"
    ? production
    : process.env.REACT_APP_DEPLOYMENT === "staging"
    ? staging
    : local;

export default {
  someCommonConfig: "",
  ...config,
};
