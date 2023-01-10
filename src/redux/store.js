/** @format */

import { configureStore } from "@reduxjs/toolkit";
import { disableErrorHandling } from "expo";
import auth from "./auth";

export const store = configureStore({
  reducer: {
    auth,
    
  },
});
