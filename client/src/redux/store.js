// src/redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { api } from '../redux/api.js';
import authReducer from './authSlice.js';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
    auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(api.middleware),
});

export default store;