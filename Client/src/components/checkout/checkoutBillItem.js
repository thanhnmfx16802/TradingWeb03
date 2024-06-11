import addDotsToPrice from "../home/price-format";

const CheckoutBillItem = (props) => {
  return (
    <div className="Co_billItem">
      <div className="Co_billItem_name">{props.item.name}</div>
      <div className="Co_billItem_price">
        {addDotsToPrice(props.item.price)} x {props.item.quantity}
      </div>
      <hr />
    </div>
  );
};

export default CheckoutBillItem;
