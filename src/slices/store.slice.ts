import { createSlice } from "@reduxjs/toolkit";

export interface StoreState {
  stores: any;
  selectedStore: any;
  filters: {
    brand: string[];
    country: string[];
  };
}

export const initialState: StoreState = {
  stores: null,
  selectedStore: null,
  filters: {
    brand: [],
    country: [],
  },
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
    setFilters: (state, action) => {
      state.filters = {
        ...initialState.filters,
        ...action.payload,
      };
    },
  },
});

export const { setStores, setStore, setFilters } = storeSlice.actions;

export default storeSlice.reducer;
