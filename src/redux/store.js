import { configureStore } from '@reduxjs/toolkit';
import provincesReducer from './provinces/provincesSlice';

const store = configureStore({
  reducer: {
    provinces: provincesReducer,
  },
});

export default store;
