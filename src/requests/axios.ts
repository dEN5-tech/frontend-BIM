import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://04f2-37-144-182-25.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
