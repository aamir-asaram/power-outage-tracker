import { configureStore } from '@reduxjs/toolkit';
import provincesReducer from './provinces/provincesSlice';
import detailsReducer from './details/detailsSlice';

const store = configureStore({
  reducer: {
    provinces: provincesReducer,
    details: detailsReducer,
  },
});

export default store;
