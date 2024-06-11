import addDotsToPrice from "../home/price-format";

const BillInfo = ({ userId, name, phone, address, total }) => {
  return (
    <section>
      <h2 className="bill_info">INFORMATION ORDER</h2>
      <p className="bill_info">User ID: {userId}</p>
      <p className="bill_info">Full Name: {name}</p>
      <p className="bill_info">Phone: {phone}</p>
      <p className="bill_info">Address: {address}</p>
      <p className="bill_info">Total: {addDotsToPrice(total)}</p>
    </section>
  );
};

export default BillInfo;
