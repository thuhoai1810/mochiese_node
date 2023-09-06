/** @format */

import axios from "axios";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
const API_KEY =
  "2b99ab55022a4307d5d031a92de3b30759db30f3c71b5a2690c8a42e7e8f7aeae9516284ff0444b3aac4dcbc8604f33c9dca9eb524a171dd66b96cce217d1952";

// setup apiInstance
export const apiInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    // "api-key": API_KEY,
  },
});

// setup interceptor for request
apiInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // config.headers.Authorization = `Bearer ${getCookie("token")}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const axiosGetMethod = async (endpoint, config) => {
  try {
    const finalParam = config || {};
    const res = await apiInstance.get(endpoint, { ...finalParam });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const axiosPostMethod = async (endpoint, body, customInfo) => {
  try {
    const finalParam = customInfo || {};
    const res = await apiInstance.post(endpoint, body, {
      ...finalParam,
    });
    return res;
  } catch (err) {
    console.log("post err___", err);
    return err;
  }
};
