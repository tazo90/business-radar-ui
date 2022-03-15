import { combineReducers } from "@reduxjs/toolkit";

import storeReducer from "./store.slice";
import locationSlice from "./location.slice";

const rootReducer = combineReducers({
  store: storeReducer,
  location: locationSlice,
});

export default rootReducer;
