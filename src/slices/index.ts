import { combineReducers } from "@reduxjs/toolkit";

import storeReducer from '@slices/store.slice';

const rootReducer = combineReducers({
  store: storeReducer,
});

export default rootReducer;
