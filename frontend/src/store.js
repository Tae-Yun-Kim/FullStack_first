import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import authReducer from "./slices/authSlice";
import favoritesSlice from "./slices/favoritesSlice";
import { thunk } from 'redux-thunk';

const combinedReducer = {
  cart: cartReducer,
  auth: authReducer,
  favorites: favoritesSlice,
};

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    // 모든 상태를 undefined로 설정하여 각 리듀서의 초기 상태로 리셋
    state = undefined;
  }
  return Object.keys(combinedReducer).reduce((acc, key) => {
    acc[key] = combinedReducer[key](state?.[key], action);
    return acc;
  }, {});
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}),
});

export default store;