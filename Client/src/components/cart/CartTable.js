import CartRow from "./CartRow";

const CartTable = (props) => {
  const items = props.items;
  let content = <p>No items.</p>;
  if (items.length > 0) {
    content = (
      <table className="cart_table">
        <thead className="cart_table_head">
          <tr>
            <th className="cart_th">Image</th>
            <th className="cart_th">Product</th>
            <th className="cart_th">Price</th>
            <th className="cart_th">Quantity</th>
            <th className="cart_th">Total</th>
            <th className="cart_th">Remove</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <CartRow key={item.productId} item={item} />
          ))}
        </tbody>
      </table>
    );
  }

  return content;
};

export default CartTable;
