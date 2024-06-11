import { useSelector } from "react-redux";

import addDotsToPrice from "../home/price-format";
import CheckoutBillItem from "./checkoutBillItem";

const CheckoutBill = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);

  return (
    <div className="Co_Bill_Wrap">
      <h4>Your Order</h4>
      {items.map((item, id) => (
        <CheckoutBillItem key={id} item={item} />
      ))}
      <p className="Co_Bill">
        <span>TOTAL</span>
        <span>{addDotsToPrice(totalPrice)}</span>
      </p>
    </div>
  );
};

export default CheckoutBill;
