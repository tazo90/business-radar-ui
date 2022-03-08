import { createSlice } from "@reduxjs/toolkit";

export interface StoreState {
  stores: any;
  selectedStore: any;
}

export const initialState: StoreState = {
  stores: null,
  selectedStore: null,
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setStores: (state, action) => {
      state.stores = action.payload;
    },
    setStore: (state, action) => {
      state.selectedStore = action.payload;
    },
  },
});

export const { setStores, setStore } = storeSlice.actions;

export default storeSlice.reducer;
