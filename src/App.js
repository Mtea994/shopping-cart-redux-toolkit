import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useDispatch, useSelector } from "react-redux";
import {
  // fetchDataToCart,
  sendDataToCart,
} from "./components/store/cart-actions";

import { fetchDataToCart } from "./components/store/cart-slice";

let initialRender = true;
function App() {
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataToCart());
  }, [dispatch]);

  useEffect(() => {
    if (initialRender) {
      initialRender = false;
      return;
    }
    dispatch(sendDataToCart(cart));
  }, [cart, dispatch]);

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
