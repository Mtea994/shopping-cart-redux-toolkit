import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./components/store/ui-slice";
let initialRender = true;
function App() {
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const sendFetch = async () => {
      dispatch(
        uiActions.sendNotification({
          status: "pending",
          title: "Sending...",
          message: "sending data to cart",
        })
      );

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

    if (initialRender) {
      initialRender = false;
      return;
    }

    sendFetch().catch(() =>
      dispatch(
        uiActions.sendNotification({
          status: "error",
          title: "Error",
          message: "Sending Data to Cart Failed",
        })
      )
    );
  }, [cart, dispatch]);
  console.log(cartIsVisible);

  return (
    <Layout>
      {notification && (
        <Notification
          title={notification.title}
          status={notification.status}
          message={notification.message}
        />
      )}
      {cartIsVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
