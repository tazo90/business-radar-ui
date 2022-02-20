import axios from "axios";

const http = axios.create({
  baseURL: 'localhost:8000',
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default http;
