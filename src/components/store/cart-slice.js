import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [], totalQuantity: 0 },
  reducers: {
    replaceCart(state, action) {
      state.cartItems = action.payload.cartItems;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addToCart(state, action) {
      state.totalQuantity++;
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      if (!existingItem) {
        state.cartItems.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeFromCart(state, action) {
      state.totalQuantity--;
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
    emptyCart(state) {
      state.cartItems = [];
    },
  },
});

export const cartSliceActions = cartSlice.actions;
export default cartSlice.reducer;
