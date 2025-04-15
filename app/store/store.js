"use client";

import { configureStore } from "@reduxjs/toolkit";
import animationReducer from "./slice/animationSlice";

export const store = configureStore({
  reducer: {
    animation: animationReducer,
  },
});

export default store;
