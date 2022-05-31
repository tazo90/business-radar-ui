import { combineReducers } from "@reduxjs/toolkit";

import appReducer from "./app.slice";
import storeReducer from "./store.slice";
import locationSlice from "./location.slice";

const rootReducer = combineReducers({
  app: appReducer,
  store: storeReducer,
  location: locationSlice,
});

export default rootReducer;
