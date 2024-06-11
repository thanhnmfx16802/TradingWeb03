import OrderRow from "./OrderRow";

const OrderTable = ({ orders }) => {
  let content = <p>No orders.</p>;
  if (orders.length > 0) {
    content = (
      <table className="cart_table" style={{ width: "100%" }}>
        <thead className="cart_table_head">
          <tr>
            <th className="cart_th">Order ID</th>
            <th className="cart_th">User ID</th>
            <th className="cart_th">Name</th>
            <th className="cart_th">Phone</th>
            <th className="cart_th">Address</th>
            <th className="cart_th">Total</th>
            <th className="cart_th">Delivery</th>
            <th className="cart_th">Status</th>
            <th className="cart_th">Detail</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderRow key={order._id} order={order} />
          ))}
        </tbody>
      </table>
    );
  }

  return content;
};

export default OrderTable;
