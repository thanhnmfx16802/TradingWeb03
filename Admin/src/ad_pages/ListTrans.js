import "./dashBoard.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SideBar from "./SideBar";
import Card from "./Card";
import Paginator from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import addDotsToPrice from "../components/price-format";
import baseUrl from "../url/baseUrl";

function TransactionList() {
  const navigate = useNavigate();
  const role = useSelector((state) => state.loginAdmin.role);
  const [error, setError] = useState("");
  const [orderCount, setOrderCount] = useState("");
  const [currentTrans, setCurrentTrans] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getTrans = async () => {
      try {
        const response = await fetch(baseUrl + "/admin/trans", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (response.status === 404) {
          throw new Error("No transaction available");
        }
        if (response.status !== 200) {
          throw new Error("Something went wrong with server!");
        }
        const data = await response.json();

        setCurrentTrans(data.transactions);
        setOrderCount(data.numberOfOrder);
      } catch (err) {
        setError(err.message);
      }
    };
    getTrans();
  }, []);

  const loadTrans = async (direction) => {
    let pageNum = page;
    if (direction === "next") {
      pageNum++;
      setPage(pageNum);
    }
    if (direction === "previous") {
      pageNum--;
      setPage(pageNum);
    }
    try {
      const response = await fetch(baseUrl + "/admin/trans?page=" + pageNum, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.status === 404) {
        throw new Error("No transaction available");
      }
      if (response.status !== 200) {
        throw new Error("Something went wrong with server!");
      }
      const data = await response.json();

      setCurrentTrans(data.transactions);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-3">
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {currentTrans.length > 0 && (
        <div className="d-flex gap-4 justify-content-center">
          <SideBar />
          {role === "Admin" ? (
            <Card className="card_trans">
              <h1 className="fs-5 text-muted">Transactions List</h1>

              <table className="trans-table">
                <thead>
                  <tr className="trans-head">
                    <th>ID User</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Total</th>
                    <th>Delivery</th>
                    <th>Status</th>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTrans.map((trans, i) => {
                    return (
                      <tr key={i}>
                        <td>{trans.userId}</td>
                        <td>{trans.fullname}</td>
                        <td>{trans.phone}</td>
                        <td>{trans.address}</td>
                        <td>{addDotsToPrice(trans.totalPrice)}</td>
                        <td>Chưa vận chuyển</td>
                        <td>Chưa thanh toán</td>
                        <td>
                          <button
                            onClick={() => navigate(`/order/${trans._id}`)}
                            type="button"
                            className="btn btn-success"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Paginator
                onPrevious={() => loadTrans("previous")}
                onNext={() => loadTrans("next")}
                currentPage={page}
                lastPage={Math.ceil(orderCount / 9)}
              >
                {`${page} / ${Math.ceil(orderCount / 9)}`}
              </Paginator>
            </Card>
          ) : (
            <p className="text-danger text-center mt-3 ms-3">
              "Only Admin can see order list!"
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default TransactionList;
