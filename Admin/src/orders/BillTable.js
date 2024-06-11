import BillRow from "./BillRow";
import "./Bill.css";

const BillTable = ({ items }) => {
  let content = <p>No items.</p>;
  if (items && items.length > 0) {
    content = (
      <table className="cart_table" style={{ width: "100%" }}>
        <thead className="cart_table_head">
          <tr>
            <th className="cart_th">ID Product</th>
            <th className="cart_th">Image</th>
            <th className="cart_th">Name</th>
            <th className="cart_th">Price</th>
            <th className="cart_th">Count</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <BillRow
              key={item.productId._id}
              item={item.productId}
              quantity={item.quantity}
            />
          ))}
        </tbody>
      </table>
    );
  }

  return content;
};

export default BillTable;
