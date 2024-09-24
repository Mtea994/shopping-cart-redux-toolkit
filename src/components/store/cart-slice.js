import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [], totalQuantity: 0 },
  reducers: {
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

export const sendDataToCart = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.sendNotification({
        status: "pending",
        title: "Sending...",
        message: "sending data to cart",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://asyncodertk-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("failed to send data to cart");
      }
      dispatch(
        uiActions.sendNotification({
          status: "success",
          title: "Success",
          message: "Successfully added Data to Cart",
        })
      );
    };
    try {
      await sendRequest();
    } catch (error) {
      dispatch(
        uiActions.sendNotification({
          status: "error",
          title: "Error",
          message: "Sending Data to Cart Failed",
        })
      );
    }
  };
};

export const cartSliceActions = cartSlice.actions;
export default cartSlice.reducer;
