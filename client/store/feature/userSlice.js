/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { INITIAL_USER_STATE } from "../../utils/constants/reduxConstant";


const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_USER_STATE,
  reducers: {}});

// user register
// export const registerUser = createAsyncThunk(
//   "user/registerUser",
//   async (userInfo) => {
//     try {
//       const res = await userRegisterAPI(userInfo);
//       if (res.status * 1 === 201) {
//         const resResult = {
//           err: "",
//           data: res?.data?.data,
//           authScreen: AUTH_SCREEN.signUpSuccess,
//         };
//         setCookie("tokens", JSON.stringify(res?.data?.data.tokens), 1);
//         setLocalStorageValue(
//           "userInfo",
//           JSON.stringify(res?.data?.data.user)
//         );
//
//         // The number of user signup success
//         gaEvent({ eventName: "signup_success" });
//
//         return resResult;
//       }
//       if (!(res.status * 1 === 201)) {
//         const resResult = {
//           err: "*Email has been exists",
//           user: { data: {} },
//           authScreen: AUTH_SCREEN.signUp,
//         };
//         return resResult;
//       }
//     } catch (err) {
//       return err;
//     }
//   }
// );
//
// // user login
// export const loginUser = createAsyncThunk(
//   "user/loginUser",
//   async (userInfo) => {
//     try {
//       const res = await userLoginAPI(userInfo);
//       if (res.status * 1 === 200) {
//         const resResult = {
//           err: "",
//           data: res?.data?.data,
//           authScreen: AUTH_SCREEN.loginSuccess,
//         };
//         setCookie("tokens", JSON.stringify(res?.data?.data.tokens), 1);
//         setLocalStorageValue(
//           "userInfo",
//           JSON.stringify(res?.data?.data.user)
//         );
//         return resResult;
//       }
//       if (!(res.status * 1 === 200)) {
//         // alert("login fail");
//         const resResult = {
//           err: res.response.data.message,
//           user: { data: {} },
//           authScreen: AUTH_SCREEN.login,
//         };
//         return resResult;
//       }
//     } catch (err) {
//       return err;
//     }
//   }
// );
//
//
// // get user info
// export const getInfoUser = createAsyncThunk(
//   "user/getInfoUser",
//   async (userInfo) => {
//     try {
//       const res = await getUserInfoAPI(userInfo);
//       if (res.status * 1 === 200) {
//         const resResult = {
//           err: "",
//           data: res?.data?.data,
//           authScreen: "",
//         };
//         return resResult;
//       }
//       if (!(res.status * 1 === 200)) {
//         // alert("login fail");
//         const resResult = {
//           err: "",
//           user: { data: {} },
//           authScreen: "",
//         };
//         // return resResult;
//       }
//     } catch (err) {
//       return err;
//     }
//   }
// );

export const {
  openAuthScreen,
  resetError,
  setInitUserInfoFromCookieAndLocalStorage,
  loginWithGoogle,
} = userSlice.actions;

export const { actions, reducer } = userSlice;

export default userSlice.reducer;
