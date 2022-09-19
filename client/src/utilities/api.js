import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL_API,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

export default api;
