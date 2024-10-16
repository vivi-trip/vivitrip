import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 1000 * 3,
});

export default api;
