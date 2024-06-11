import { useEffect } from "react";
import Dashboard from "../ad_pages/dashboard";
import SideBar from "../ad_pages/SideBar";
import Login from "../auth_AD/AD_Login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { autoLogout } from "../components/autoLogout_AD";
import { loginAdActions } from "../store/login-slice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.loginAdmin.isLogin);
  const role = useSelector((state) => state.loginAdmin.role);

  // setup auto logout base on token expired
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
      loginAdActions.ON_LOGIN(JSON.parse(localStorage.getItem("loginAdmin")))
    );
    // auto logout when token is expire
    autoLogout(logoutHandler, remainingMilliseconds);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.setItem("loginAdmin", JSON.stringify({ isLogin: false }));
    dispatch(loginAdActions.ON_LOGIN(localStorage.getItem("loginAdmin")));
    navigate("/login");
  };

  return (
    <div>
      {!isLogin ? (
        <Login />
      ) : (
        <div className="d-flex gap-4 justify-content-center">
          <SideBar />
          {role === "Admin" ? (
            <Dashboard />
          ) : (
            <p className="text-danger text-center mt-3 ms-3">
              "Only Admin can see Dashboard!"
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
