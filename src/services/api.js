import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/" || "https://cegonhaufjf.herokuapp.com/",
});

axiosInstance.interceptors.request.use(
  function(config) {
    const token = window.localStorage.token;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export const api = {
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body);
  },

  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
  delete(endpoint) {
    return axiosInstance.delete(endpoint);
  },
};

export default api;
