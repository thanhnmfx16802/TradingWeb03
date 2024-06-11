import { NavLink } from "react-router-dom";
import addDotsToPrice from "../home/price-format";

const CartRow = ({ order }) => {
  return (
    <tr>
      <td className="td_order">{order._id}</td>
      <td className="td_order">{order.userId}</td>
      <td className="td_order">{order.fullname}</td>
      <td className="td_order">{order.phone}</td>
      <td className="td_order">{order.address}</td>
      <td className="td_order">{addDotsToPrice(order.totalPrice)}</td>
      <td className="td_order">{order.delivery}</td>
      <td className="td_order">{order.status}</td>
      <td className="td_order td_but">
        <NavLink to={`/orders/${order._id}`} className="cart_nav right">
          View
        </NavLink>
      </td>
    </tr>
  );
};

export default CartRow;
