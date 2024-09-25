import { uiActions } from "./ui-slice";
import { cartSliceActions } from "./cart-slice";

export const fetchDataToCart = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.sendNotification({
        status: "pending",
        title: "Loading...",
        message: "Loading data to cart",
      })
    );
    const fetchData = async () => {
      const response = await fetch(
        "https://asyncodertk-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("failed to fetch Data");
      }
      const resData = await response.json();
      return resData;
    };

    try {
      const data = await fetchData();
      dispatch(cartSliceActions.replaceCart(data));
      dispatch(
        uiActions.sendNotification({
          status: "success",
          title: "Success...",
          message: "Data Loaded Successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.sendNotification({
          status: "error",
          title: "Error...",
          message: "Failed to load Data",
        })
      );
    }
  };
};

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
