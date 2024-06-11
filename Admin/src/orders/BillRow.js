import addDotsToPrice from "../components/price-format";

const BillRow = ({ item, quantity }) => {
  return (
    <tr>
      <td>{item._id}</td>
      <td>
        <img src={item.img1} alt={item.name} />
      </td>
      <td>{item.name}</td>
      <td>{addDotsToPrice(item.price)}</td>
      <td>{quantity}</td>
    </tr>
  );
};

export default BillRow;
