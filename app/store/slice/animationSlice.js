import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shouldAnimatePageTransition: false,
  isInitialLoad: true,
};

export const animationSlice = createSlice({
  name: "animation",
  initialState,
  reducers: {
    triggerPageTransition: (state) => {
      state.shouldAnimatePageTransition = true;
    },
    resetPageTransition: (state) => {
      state.shouldAnimatePageTransition = false;
    },
    setInitialLoadComplete: (state) => {
      state.isInitialLoad = false;
    },
  },
});

export const {
  triggerPageTransition,
  resetPageTransition,
  setInitialLoadComplete,
} = animationSlice.actions;
export default animationSlice.reducer;
