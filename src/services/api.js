import axios from "axios";

const apiURL = "http://localhost:3000";

export default function api() {
  return axios.create({ baseURL: apiURL });
}
