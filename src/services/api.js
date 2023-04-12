import axios from "axios";

const apiURL = "http://192.168.0.184:3000";

export default function api() {
  return axios.create({ baseURL: apiURL });
}
