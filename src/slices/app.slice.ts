import { createSlice } from "@reduxjs/toolkit";

export interface AppState {
  config: any;
}

export const initialState: AppState = {
  config: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppConfig: (state, action) => {
      state.config = action.payload;
    },
  },
});

export const { setAppConfig } = appSlice.actions;

export default appSlice.reducer;
