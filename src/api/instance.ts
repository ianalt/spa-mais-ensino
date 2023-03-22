const axios = require("axios").default;

export const instance = axios.create({
  baseURL: `http://${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_PORT}`,
  timeout: 60 * 1000,
});

export const instanceWelcome = axios.create({
  baseURL: `http://${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_PORT}`,
  timeout: 60 * 1000,
});

// Set the AUTH token for any request
instance.interceptors.request.use(function (config: any) {
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN_NAME!);
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
