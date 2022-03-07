const axios = require("axios").default;

const instance = axios.create({
  baseURL: "https://50f3-103-244-176-173.ngrok.io",
  timeout: 80000
});

export default instance;
