const axios = require("axios").default;

const instance = axios.create({
  baseURL: "http://20.203.45.189:3000",
  timeout: 80000
});

export default instance;
