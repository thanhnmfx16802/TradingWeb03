import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { cartActions } from "../../store/cart-slice";
import addDotsToPrice from "../home/price-format";
import baseUrl from "../../url/baseUrl";

const CartRow = (props) => {
  let { productId, img, name, price, quantity, totalPriceOfProduct } =
    props.item;
  const dispatch = useDispatch();

  // UPDATE_CART actions.
  // increase
  const incrementHandler = async () => {
    quantity++;
    totalPriceOfProduct = quantity * price;

    try {
      const response = await fetch(baseUrl + "/increment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        credentials: "same-origin",
        mode: "cors",

        body: JSON.stringify({
          productId,
          quantity,
          totalPriceOfProduct,
        }),
      });

      if (response.status === 404) {
        throw new Error("Cannot increase quantity.");
      }

      if (response.status !== 200) {
        throw new Error("Something went wrong with server.");
      }
      const data = await response.json();
      //update for items
      dispatch(cartActions.updateCartItems(data));
      // update for totalPrice
      const priceArr = data.map((prod) => +prod.totalPriceOfProduct);
      dispatch(
        cartActions.updatedCartPrice(priceArr.reduce((a, b) => a + b, 0))
      );
    } catch (err) {
      console.log(err);
    }
  };
  // decrease
  const decrementHandler = async () => {
    if (quantity === 1) {
      return deleteHandler();
    }

    quantity--;
    totalPriceOfProduct = quantity * price;
    try {
      const response = await fetch(baseUrl + "/decrement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        credentials: "same-origin",
        mode: "cors",

        body: JSON.stringify({
          productId,
          quantity,
          totalPriceOfProduct,
        }),
      });

      if (response.status === 404) {
        throw new Error("Cannot decrease quantity.");
      }

      if (response.status !== 200) {
        throw new Error("Something went wrong with server.");
      }
      const data = await response.json();
      //update for items
      dispatch(cartActions.updateCartItems(data));
      // update for totalPrice
      const priceArr = data.map((prod) => +prod.totalPriceOfProduct);
      dispatch(
        cartActions.updatedCartPrice(priceArr.reduce((a, b) => a + b, 0))
      );
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE.
  const deleteHandler = async () => {
    try {
      const response = await fetch(baseUrl + "/remove-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        credentials: "same-origin",
        mode: "cors",

        body: JSON.stringify({
          productId,
        }),
      });

      if (response.status === 404) {
        throw new Error("Cannot Delete product!");
      }

      if (response.status !== 200) {
        throw new Error("Something went wrong with server.");
      }

      const data = await response.json();
      //update for items
      dispatch(cartActions.updateCartItems(data));
      // update for totalPrice
      const priceArr = data.map((prod) => +prod.totalPriceOfProduct);
      dispatch(
        cartActions.updatedCartPrice(priceArr.reduce((a, b) => a + b, 0))
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <tr>
      <td>
        <img src={img} alt={name} />
      </td>
      <td className="td_name">{name}</td>
      <td className="td_price">{addDotsToPrice(price)}</td>
      <td>
        <button onClick={decrementHandler}>&#9664;</button>
        {quantity}
        <button onClick={incrementHandler}>&#9654;</button>
      </td>
      <td className="td_price">{addDotsToPrice(totalPriceOfProduct)}</td>
      <td>
        <button onClick={deleteHandler}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </td>
    </tr>
  );
};

export default CartRow;
