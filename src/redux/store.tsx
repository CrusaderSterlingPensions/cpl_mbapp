import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import servicesReducer from './servicesSlices';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    services: servicesReducer,
  },
});
