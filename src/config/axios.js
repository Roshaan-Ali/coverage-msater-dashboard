import axios from "axios";
import { baseUrl } from "./config.json";

export const PostReq = (apiEndPoint, data) => {
  return axios.post(`${baseUrl}${apiEndPoint}`, data);
};
