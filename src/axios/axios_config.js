const axios = require("axios").default;

const instance = axios.create({
  baseURL: "http://ed68-110-93-244-255.ngrok.io",
  timeout: 80000
});

export default instance;
