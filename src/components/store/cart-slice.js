import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

export const fetchDataToCart = createAsyncThunk(
  "cart/fetchData",
  async (_, { dispatch }) => {
    dispatch(
      uiActions.sendNotification({
        status: "pending",
        title: "Loading...",
        message: "Loading data to cart",
      })
    );
    const response = await fetch(
      "https://asyncodertk-default-rtdb.firebaseio.com/cart.json"
    );
    if (!response.ok) {
      dispatch(
        uiActions.sendNotification({
          status: "error",
          title: "Error...",
          message: "Failed to load Data",
        })
      );
    }
    const resData = await response.json();
    dispatch(
      uiActions.sendNotification({
        status: "success",
        title: "Success...",
        message: "Data Loaded Successfully",
      })
    );
    return resData;
  }
);

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
  extraReducers: (builder) => {
    // builder.addCase(fetchDataToCart.pending, (state, action) => {});
    builder.addCase(fetchDataToCart.fulfilled, (state, action) => {
      state.cartItems = action.payload.cartItems || [];
      state.totalQuantity = action.payload.totalQuantity;
    });
    // builder.addCase(fetchDataToCart.rejected, (state, action) => {});
  },
});

export const cartSliceActions = cartSlice.actions;
export default cartSlice.reducer;
