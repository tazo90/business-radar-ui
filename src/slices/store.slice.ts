import { createSlice } from "@reduxjs/toolkit";

export interface StoreState {
  stores: any;
  selectedStore: any;
  // set source of store selection
  selectedStoreTriggerSource: null | "list" | "map";
  filters: {
    brand: string[];
    country: string[];
  };
}

export const initialState: StoreState = {
  stores: null,
  selectedStore: null,
  selectedStoreTriggerSource: null,
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
    setStoreTriggerSource: (state, action) => {
      state.selectedStoreTriggerSource = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = {
        ...initialState.filters,
        ...action.payload,
      };
    },
  },
});

export const { setStores, setStore, setStoreTriggerSource, setFilters } =
  storeSlice.actions;

export default storeSlice.reducer;
