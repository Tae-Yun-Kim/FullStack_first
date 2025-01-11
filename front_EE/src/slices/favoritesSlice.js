// 찜 목록 관련 Redux 상태 관리
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [], // 찜한 상품 리스트
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const item = action.payload;
      const exists = state.favorites.find((fav) => fav.id === item.id);
      if (exists) {
        state.favorites = state.favorites.filter((fav) => fav.id !== item.id);
      } else {
        state.favorites.push(item);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
