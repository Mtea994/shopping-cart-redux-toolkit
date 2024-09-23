import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [], totalQuantity: 0 },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      if (!existingItem) {
        state.cartItems.push({ ...newItem, quantity: 1 });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeFromCart(state, action) {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (!existingItem) {
        state.cartItems.filter((item) => item.id !== action.payload);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.price;
      }
    },
    emptyCart(state) {
      state.cartItems = [];
    },
  },
});

export const cartSliceActions = cartSlice.actions;
export default cartSlice.reducer;
