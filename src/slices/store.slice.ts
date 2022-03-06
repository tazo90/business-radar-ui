import { createSlice } from "@reduxjs/toolkit";

export interface StoreState {
  stores: any;
}

export const initialState: StoreState = {
  stores: null,
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setStores: (state, action) => {
      state.stores = action.payload;
    },
  },
});

export const { setStores } = storeSlice.actions;

export default storeSlice.reducer;
