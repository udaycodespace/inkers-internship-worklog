import axios from "axios";

const frappe = axios.create({
  baseURL: "http://localhost:8002",
  withCredentials: true
});

export default frappe;
