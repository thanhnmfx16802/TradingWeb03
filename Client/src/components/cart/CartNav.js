import { NavLink } from "react-router-dom";

const CartNav = (props) => {
  return (
    <div className="cart_nav_wrap">
      <NavLink to="/shop" className="cart_nav left">
        &larr; Continue shopping
      </NavLink>
      {props.totalPrice > 0 ? (
        <NavLink to="/checkout" className="cart_nav right">
          Proceed to checkout &rarr;
        </NavLink>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default CartNav;
