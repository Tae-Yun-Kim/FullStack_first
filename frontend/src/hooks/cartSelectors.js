import { createSelector } from '@reduxjs/toolkit';

const selectCartState = (state) =>
  state.cart || { items: [], status: 'idle', error: null };

export const selectCartItems = createSelector(
  [(state) => state.cart.items],
  (items) => items
);
