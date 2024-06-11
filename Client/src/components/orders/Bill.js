import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import BillInfo from "./BillInfo";
import BillTable from "./BillTable";
import baseUrl from "../../url/baseUrl";
import "./Bill.css";

const Bill = () => {
  const params = useParams();
  const [order, setOrder] = useState(null);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    document.title = "Orders";
  }, []);

  useEffect(() => {
    const getBill = async () => {
      try {
        const response = await fetch(`${baseUrl}/orders/${params.id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (response.status === 404) {
          throw new Error("No found order information");
        }

        if (response.status !== 200) {
          throw new Error("Not yet login or server error");
        }

        const data = await response.json();

        setOrder(data);
        setProduct(data.products);
      } catch (err) {
        console.log(err);
      }
    };
    getBill();
  }, [params.id]);
  return (
    <Fragment>
      {order && (
        <div className="bill_wrap">
          <BillInfo
            userId={order.userId}
            name={order.fullname}
            phone={order.phone}
            address={order.address}
            total={order.totalPrice}
          />
          <div>
            <BillTable items={product} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Bill;
