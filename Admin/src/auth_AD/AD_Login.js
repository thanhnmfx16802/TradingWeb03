import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAdActions } from "../store/login-slice";
import "./Auth_form.css";
import baseUrl from "../url/baseUrl";

const Login = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchLoginData = async (e) => {
    e.preventDefault();
    const url = baseUrl + "/login-admin";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        mode: "cors",

        body: JSON.stringify({
          email: e.target.elements.email.value,
          password: e.target.elements.password.value,
        }),
      });

      if (response.status === 401 || response.status === 404) {
        throw new Error("Please enter correct information!");
      }
      if (response.status === 403) {
        throw new Error("Only Admin or Consultant account can access.");
      }
      if (response.status !== 200) {
        throw new Error("Login failed!");
      }

      const data = await response.json();

      console.log(data);
      // save information to localstorage
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "loginAdmin",
        JSON.stringify({
          isLogin: true,
          userId: data.userId,
          username: data.username,
          role: data.role,
        })
      );
      // update state in store
      dispatch(
        loginAdActions.ON_LOGIN(JSON.parse(localStorage.getItem("loginAdmin")))
      );
      // setup auto logout after token expired
      const remainingMilliseconds = 60 * 60 * 1000;
      // expired time calculated from starting login
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      // save expired time to localstorage
      localStorage.setItem("expiryDate", expiryDate.toISOString());
      // logout when token expires (1 hour)
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("expiryDate");
        localStorage.setItem("loginAdmin", JSON.stringify({ isLogin: false }));
        dispatch(loginAdActions.ON_LOGOUT(localStorage.getItem("loginAdmin")));
      }, remainingMilliseconds);

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login">
      <p className="error_signup">{error}</p>
      <form className="form-control" onSubmit={fetchLoginData}>
        <h1>Login</h1>
        <div>
          <div className="form_email">
            <input id="email" type="email" placeholder="Email" required />
          </div>

          <div className="form_password">
            <input
              id="password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
