import addDotsToPrice from "../home/price-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";

const CartTotal = (props) => {
  return (
    <div className="cart_total_wrapper">
      <h4>Cart Total</h4>
      <p className="cart_total">
        <span>Subtotal</span>
        <span className="cart_sub_price">
          {addDotsToPrice(props.totalPrice)}
        </span>
      </p>
      <hr className="my-2" />
      <p className="cart_total">
        <span>Total</span>
        <span className="cart_total_price">
          {addDotsToPrice(props.totalPrice)}
        </span>
      </p>
      <form>
        <input type="text" placeholder="Enter your coupon" />
        <button className="cart_button">
          <span>
            <FontAwesomeIcon icon={faGift} />
          </span>
          Apply coupon
        </button>
      </form>
    </div>
  );
};

export default CartTotal;
