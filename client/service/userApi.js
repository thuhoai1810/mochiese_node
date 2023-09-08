/** @format */

import { URL_ENDPOINT } from "../../next-client/utils/constants/endpoint.js";
import { axiosGetMethod, axiosPostMethod } from "./baseApi";

// registerer
export const userRegisterAPI = async (accountInfo) => {
  try {
    const res = await axiosPostMethod(
      URL_ENDPOINT.register,
      accountInfo
    );
    return res;
  } catch (err) {
    console.log("register_err___", err);
  }
};

// login
export const userLoginAPI = async (accountInfo) => {
  try {
    const res = await axiosPostMethod(URL_ENDPOINT.userLogin, accountInfo);
    return res;
  } catch (err) {}
};

// get user info
export const getUserInfoAPI = async (token) => {
  try {
    const res = await axiosGetMethod(URL_ENDPOINT.getInfoUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.log("logout_err___", err);
  }
};

