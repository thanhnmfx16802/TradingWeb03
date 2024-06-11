import Cart from "../cart/Cart";
import { useEffect } from "react";
import "../cart/cart.css";
import { cartActions } from "../../store/cart-slice";
import { useSelector, useDispatch } from "react-redux";
import baseUrl from "../../url/baseUrl";

function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  useEffect(() => {
    document.title = "Cart";
  }, []);

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await fetch(baseUrl + "/get-cart", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (response.status === 404) {
          throw new Error("Cannot show the cart");
        }

        if (response.status !== 200) {
          throw new Error("Not yet login or server error");
        }

        const data = await response.json();

        dispatch(cartActions.updateCartItems(data));
        // cal for totalPrice
        const priceArr = data.map((prod) => +prod.totalPriceOfProduct);
        dispatch(
          cartActions.updatedCartPrice(priceArr.reduce((a, b) => a + b, 0))
        );
      } catch (err) {
        console.log(err);
      }
    };
    getCart();
  }, []);

  return (
    <section className="cartPage">
      <div>
        <h2 className="cart_title">Cart</h2>
      </div>

      {cart.length === 0 && (
        <p style={{ color: "blue", textAlign: "center" }}>
          Your cart has no product now! Feel free to buy something you want!
        </p>
      )}
      {cart.length !== 0 && <Cart cartArr={cart} totalPrice={totalPrice} />}
    </section>
  );
}

export default CartPage;
