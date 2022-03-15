import { createSlice } from "@reduxjs/toolkit";

export interface StoreState {
  userLocation: any;
}

export const initialState: StoreState = {
  userLocation: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
  },
});

export const { setUserLocation } = locationSlice.actions;

export default locationSlice.reducer;
