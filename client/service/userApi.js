/** @format */

import { URL_ENDPOINT } from "utils/constants/endpoint";
import { axiosGetMethod, axiosPostMethod } from "./baseAPI";

// registerer
export const userRegisterAPI = async (accountInfo) => {
  try {
    const res = await axiosPostMethod(
      URL_ENDPOINT.userRegister,
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

// logout
export const userLogoutAPI = async (token) => {
  try {
    const res = await axiosPostMethod(
      URL_ENDPOINT.userLogout,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (err) {
    console.log("logout_err___", err);
  }
};

// get user info
export const getUserInfoAPI = async (token) => {
  try {
    const res = await axiosGetMethod(URL_ENDPOINT.getUserInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.log("logout_err___", err);
  }
};

// save learn result
export const saveLearnResultAPI = async (data, token, finallyF = () => {}) => {
  try {
    const res = await axiosPostMethod(
      URL_ENDPOINT.saveLearnResult,
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    finallyF();
    return res;
  } catch (err) {
    console.log("save result_err___", err);
  }
};

// Login width Google
export const loginWithGoogleAPI = async (data) => {
  try {
    const res = await axiosPostMethod(URL_ENDPOINT.loginWithGoogle, {
      ...data,
    });
    return res;
  } catch (err) {}
};
