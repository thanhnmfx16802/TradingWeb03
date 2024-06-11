import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  faClapperboard,
  faMoneyBillTransfer,
  faBottleWater,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { loginAdActions } from "../store/login-slice";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.setItem("loginAdmin", JSON.stringify({ isLogin: false }));
    dispatch(loginAdActions.ON_LOGIN(localStorage.getItem("loginAdmin")));
    navigate("/");
  };

  return (
    <div className="w-20 pt-3 pb-3 border-end text-muted">
      <p className="fs-3 text-primary border-bottom pe-3 pb-3">Admin Page</p>
      <div className="mb-3">
        <p className="text-uppercase text-muted fs-6 mb-0">main</p>
        <div
          onClick={() => {
            navigate("/");
          }}
          role="button"
        >
          <FontAwesomeIcon
            icon={faClapperboard}
            className="text-primary me-2"
          />
          <span className="text-muted">Dashboard</span>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-uppercase text-muted fs-6 mb-0">lists</p>

        <div
          className="mb-1"
          onClick={() => {
            navigate("/products");
          }}
          role="button"
        >
          <FontAwesomeIcon icon={faBottleWater} className="text-primary me-2" />
          <span>Products</span>
        </div>

        <div
          className="mb-1"
          onClick={() => {
            navigate("/transaction");
          }}
          role="button"
        >
          <FontAwesomeIcon
            icon={faMoneyBillTransfer}
            className="text-primary me-2"
          />
          <span>Transactions</span>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-uppercase text-muted fs-6 mb-0">user</p>
        <div role="button" onClick={logoutHandler}>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="text-primary me-2"
          />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
