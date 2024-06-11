import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../../store/userLogin-slice";
import { autoLogout } from "../../utils/autoLogout";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.loginUser.isLogin);
  const loginName = useSelector((state) => state.loginUser.username);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
    }
    // logout if token out of date
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }
    // calculate remaining time of token
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    // update state in store
    dispatch(
      loginActions.ON_LOGIN(JSON.parse(localStorage.getItem("currentUser")))
    );
    // auto logout when token is expire
    autoLogout(logoutHandler, remainingMilliseconds);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.setItem("currentUser", JSON.stringify({ isLogin: false }));
    dispatch(loginActions.ON_LOGOUT(localStorage.getItem("currentUser")));
    navigate("/login");
  };

  return (
    <header className="main-header">
      <nav className="main-header__nav">
        <ul className="main-header__item-list">
          <li className="main-header__item">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Home
            </NavLink>
          </li>

          <li className="main-header__item">
            <NavLink
              to="/shop"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Shop
            </NavLink>
          </li>
        </ul>

        <p>BOUTIQUE</p>

        <ul className="main-header__item-list">
          {isLogin && (
            <li className="main-header__item">
              <NavLink
                to="/cart"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                <span>
                  <FontAwesomeIcon icon={faCartShopping} />
                </span>
                Cart
              </NavLink>
            </li>
          )}

          {isLogin && (
            <li className="main-header__item">
              <NavLink
                to="/orders"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                <span>
                  <FontAwesomeIcon icon={faList} />
                </span>
                Orders
              </NavLink>
            </li>
          )}

          <li className="main-header__item">
            <NavLink
              to={isLogin ? "" : "/login"}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <span>
                <FontAwesomeIcon icon={faUser} />
              </span>
              {isLogin ? loginName : "Login"}
            </NavLink>
          </li>

          <li className="main-header__item">
            <span style={{ cursor: "pointer" }} onClick={logoutHandler}>
              {isLogin ? "(Logout)" : ""}
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
