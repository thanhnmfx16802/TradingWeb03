import "./dashBoard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import Paginator from "../components/Pagination";
import addDotsToPrice from "../components/price-format";
import baseUrl from "../url/baseUrl";

function Dashboard() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userCount, setUserCount] = useState("");
  const [orderCount, setOrderCount] = useState("");
  const [earning, setEarning] = useState(0);
  const [currentPageTrans, setCurrentPageTrans] = useState([]);
  const [currentTrans, setCurrentTrans] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const countUsers = async () => {
      try {
        const response = await fetch(baseUrl + "/admin/current-users", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (response.status !== 200 && response.status !== 404) {
          throw new Error("Cannot check user data due to server error!");
        }
        const data = await response.json();

        setUserCount(data.count);
      } catch (err) {
        setError(err.message);
      }
    };
    countUsers();
  }, []);

  // get all data to show info at 3 card at top
  useEffect(() => {
    const getAllTrans = async () => {
      try {
        const response = await fetch(baseUrl + "/admin/current-trans", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (response.status === 404) {
          throw new Error("No transaction available");
        }
        if (response.status !== 200) {
          throw new Error("Please login to continue!");
        }
        const data = await response.json();

        setCurrentTrans(data.transactions);
        setOrderCount(data.numberOfOrder);

        const priceArr = data.transactions.map((item) => +item.totalPrice);

        const totalPrice = priceArr.reduce((a, b) => a + b, 0);
        setEarning(totalPrice);
      } catch (err) {
        console.log(err);
      }
    };
    getAllTrans();
  }, []);

  // get data to show 8 order per page
  useEffect(() => {
    const getTrans = async () => {
      try {
        const response = await fetch(baseUrl + "/admin/current-page-trans", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (response.status === 404) {
          throw new Error("No transaction available");
        }
        if (response.status !== 200) {
          throw new Error("Please login to continue!");
        }
        const data = await response.json();

        setCurrentPageTrans(data.transactions);
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
      const response = await fetch(
        baseUrl + "/admin/current-page-trans?page=" + pageNum,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 404) {
        throw new Error("No transaction available");
      }
      if (response.status !== 200) {
        throw new Error("Something went wrong with server!");
      }
      const data = await response.json();

      setCurrentPageTrans(data.transactions);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-auto p-3">
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {currentTrans.length > 0 && (
        <div className="content">
          <div className="card-row">
            <Card className="card_title bg-primary d-flex flex-column ps-3 pt-2">
              <span className="text-white text-uppercase">Clients</span>
              <span className="fs-4">{userCount}</span>
            </Card>

            <Card className="card_title bg-warning d-flex flex-column ps-3 pt-2">
              <span className="text-white text-uppercase">Earning</span>
              <span className="fs-4">{addDotsToPrice(earning)}</span>
            </Card>
            <Card className="card_title bg-info d-flex flex-column ps-3 pt-2">
              <span className="text-white text-uppercase">New Order</span>
              <span className="fs-4">{orderCount}</span>
            </Card>
          </div>
          <div className="mt-5">
            <Card className="card_trans">
              <h1 className="fs-5">History</h1>

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
                  {currentPageTrans.map((trans, i) => {
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
                lastPage={Math.ceil(orderCount / 8)}
              >
                {`${page} / ${Math.ceil(orderCount / 8)}`}
              </Paginator>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
