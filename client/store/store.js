import {createWrapper} from "next-redux-wrapper";
import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./feature/userSlice";

export const store = configureStore({
  reducer: {
    // add your slice reducers here
    user: userSlice,
  },
});


