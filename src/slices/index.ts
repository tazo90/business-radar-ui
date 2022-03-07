import { combineReducers } from "@reduxjs/toolkit";

import storeReducer from "./store.slice";

const rootReducer = combineReducers({
  store: storeReducer,
});

export default rootReducer;
