import axios from "axios";

const http = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default http;
