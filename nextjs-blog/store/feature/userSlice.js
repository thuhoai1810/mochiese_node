/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getUserInfoAPI,
  userLoginAPI,
  userLogoutAPI,
  userRegisterAPI,
} from "service/userAPI";
import { AUTH_SCREEN } from "utils/constants/authConstants";
import { INITIAL_USER_STATE } from "utils/constants/reduxConstants";
import { deleteCookie, setCookie } from "utils/cookies";
import { gaEvent } from "utils/ga";
import {
  deleteLocalStorageValue,
  setLocalStorageValue,
} from "utils/localStorage";

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_USER_STATE,
  reducers: {
    openAuthScreen: (state, action) => {
      state = {
        ...state,
        authScreen: action.payload,
      };
      return { ...state };
    },
    resetError: (state, action) => {
      state = {
        ...state,
        error: "",
      };
      return { ...state };
    },
    loginWithGoogle: (state, action) => {
      state = {
        ...state,
        authScreen: "",
        user: action.payload?.user,
        tokens: action.payload?.tokens,
        error: "",
      };
      setCookie("tokens", JSON.stringify(action.payload?.tokens), 1);
      setLocalStorageValue(
        "userInfo",
        JSON.stringify(action.payload?.user)
      );
      return { ...state };
    },
    setInitUserInfoFromCookieAndLocalStorage: (state, action) => {
      state = {
        ...state,
        user: action.payload.user,
        tokens: action.payload.token,
      };
      return { ...state };
    },
  },
  extraReducers: (builder) => {
    builder
      //user register
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.tokens = action.payload?.data?.tokens;
        state.user = action.payload?.data?.user;
        state.error = action?.payload?.err;
        state.authScreen = action?.payload?.authScreen;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "idle";
      })
      //user login
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.tokens = action.payload?.data?.tokens;
        state.user = action.payload?.data?.user;
        state.error = action?.payload?.err;
        state.authScreen = action?.payload?.authScreen;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "idle";
      })
      //get user info
      .addCase(getInfoUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getInfoUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user.name = action.payload?.data?.name;
        state.user.email = action.payload?.data?.email;
        state.user._id = action.payload?.data?._id;
        state.user.expired_day = action.payload?.data?.expired_day;
        state.user.updatedAt = action.payload?.data?.updatedAt;
        state.authScreen = "";
      })
      .addCase(getInfoUser.rejected, (state, action) => {
        state.status = "idle";
      })
      //user logout
      .addCase(logoutUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.tokens = INITIAL_USER_STATE.tokens;
        state.user = INITIAL_USER_STATE.user;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

// user register
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userInfo) => {
    try {
      const res = await userRegisterAPI(userInfo);
      if (res.status * 1 === 201) {
        const resResult = {
          err: "",
          data: res?.data?.data,
          authScreen: AUTH_SCREEN.signUpSuccess,
        };
        setCookie("tokens", JSON.stringify(res?.data?.data.tokens), 1);
        setLocalStorageValue(
          "userInfo",
          JSON.stringify(res?.data?.data.user)
        );

        // The number of user signup success
        gaEvent({ eventName: "signup_success" });

        return resResult;
      }
      if (!(res.status * 1 === 201)) {
        const resResult = {
          err: "*Email has been exists",
          user: { data: {} },
          authScreen: AUTH_SCREEN.signUp,
        };
        return resResult;
      }
    } catch (err) {
      return err;
    }
  }
);

// user login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userInfo) => {
    try {
      const res = await userLoginAPI(userInfo);
      if (res.status * 1 === 200) {
        const resResult = {
          err: "",
          data: res?.data?.data,
          authScreen: AUTH_SCREEN.loginSuccess,
        };
        setCookie("tokens", JSON.stringify(res?.data?.data.tokens), 1);
        setLocalStorageValue(
          "userInfo",
          JSON.stringify(res?.data?.data.user)
        );
        return resResult;
      }
      if (!(res.status * 1 === 200)) {
        // alert("login fail");
        const resResult = {
          err: res.response.data.message,
          user: { data: {} },
          authScreen: AUTH_SCREEN.login,
        };
        return resResult;
      }
    } catch (err) {
      return err;
    }
  }
);

// user logout
export const logoutUser = createAsyncThunk("user/logoutUser", async (token) => {
  try {
    const res = await userLogoutAPI(token);
    if (res.status * 1 === 200) {
      // alert("logout success");
      deleteCookie("tokens");
      deleteLocalStorageValue("userInfo");
      window.location.reload();
    }
    if (!(res.status * 1 === 200)) {
      // alert("logout fail");
      deleteCookie("tokens");
      deleteLocalStorageValue("userInfo");
    }
  } catch (err) {
    return err;
  }
});

// get user info
export const getInfoUser = createAsyncThunk(
  "user/getInfoUser",
  async (userInfo) => {
    try {
      const res = await getUserInfoAPI(userInfo);
      if (res.status * 1 === 200) {
        const resResult = {
          err: "",
          data: res?.data?.data,
          authScreen: "",
        };
        return resResult;
      }
      if (!(res.status * 1 === 200)) {
        // alert("login fail");
        const resResult = {
          err: "",
          user: { data: {} },
          authScreen: "",
        };
        // return resResult;
      }
    } catch (err) {
      return err;
    }
  }
);

export const {
  openAuthScreen,
  resetError,
  setInitUserInfoFromCookieAndLocalStorage,
  loginWithGoogle,
} = userSlice.actions;

export const { actions, reducer } = userSlice;

export default userSlice.reducer;
