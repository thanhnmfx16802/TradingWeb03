import CartTable from "./CartTable";
import { useSelector } from "react-redux";
import CartNav from "./CartNav";
import CartTotal from "./CartTotal";

const Cart = (props) => {
  return (
    <section className="cart_section">
      <h4>Shopping Cart</h4>
      <div className="cart_section_flex">
        <div className="cart_table_wrap">
          <CartTable items={props.cartArr} />
          <CartNav totalPrice={props.totalPrice} />
        </div>

        <CartTotal totalPrice={props.totalPrice} />
      </div>
    </section>
  );
};

export default Cart;
