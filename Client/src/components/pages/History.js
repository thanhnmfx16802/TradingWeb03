import { useState, useEffect } from "react";
import OrderTable from "../orders/OrderTable";
import baseUrl from "../../url/baseUrl";

const History = () => {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch(baseUrl + "/get-orders", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (response.status === 404) {
          throw new Error("No have order");
        }

        if (response.status !== 200) {
          throw new Error("Not yet login or server error");
        }

        const data = await response.json();

        setOrder(data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);

  return (
    <section className="cartPage" style={{ fontSize: "14px" }}>
      <div>
        <h2 className="cart_title">History</h2>
      </div>
      <div>
        <OrderTable orders={order} />
      </div>
    </section>
  );
};
export default History;
