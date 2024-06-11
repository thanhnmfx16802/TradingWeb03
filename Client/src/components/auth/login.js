import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/userLogin-slice";
import useInput from "../../hooks/useInput";
import baseUrl from "../../url/baseUrl";
import "./Auth_form.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [formError, setFormError] = useState(false);

  const {
    data: email,
    setData: setEmail,
    error: emailError,
  } = useInput((input) => input.length > 0 && input.includes("@"));

  const {
    data: password,
    setData: setPassword,
    error: passwordError,
  } = useInput((input) => input.length >= 8);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (email === "" && password === "") {
      setFormError(true);
    } else if (!emailError && !passwordError) {
      setFormError(false);
      const url = baseUrl + "/login";

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

        if (response.status === 401) {
          throw new Error("A user with this email could not be found.");
        }

        if (response.status !== 200) {
          throw new Error("Could not authenticate you!");
        }
        setLoginError(null);
        const data = await response.json();
        console.log(data);
        // save information to localstorage
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            isLogin: true,
            userId: data.userId,
            username: data.username,
          })
        );

        // update state in store
        dispatch(
          loginActions.ON_LOGIN(JSON.parse(localStorage.getItem("currentUser")))
        );
        // setup auto logout after token expired
        const remainingMilliseconds = 60 * 60 * 1000;
        // expired time calculated from starting login
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        // save expired time to localstorage
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        // logout when token expires (1 hour)
        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("expiryDate");
          localStorage.setItem(
            "currentUser",
            JSON.stringify({ isLogin: false })
          );
          dispatch(loginActions.ON_LOGOUT(localStorage.getItem("currentUser")));
        }, remainingMilliseconds);

        navigate("/");
      } catch (err) {
        setLoginError(err.message);
      }
    }
  };

  return (
    <div className="form_control_wrap">
      {formError && (
        <p className="error_auth">
          Please fill for all the fields with correct information!
        </p>
      )}

      {emailError && <p className="error_auth">Email is invalid!</p>}
      {passwordError && <p className="error_auth">Password is invalid!</p>}
      {loginError && <p className="error_auth">{loginError}</p>}
      <div className="form__wrap">
        <form className="form-control" onSubmit={handleSubmitLogin}>
          <h1>Sign In</h1>
          <div>
            <div className="form_email">
              <input
                name="email"
                value={email}
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form_password">
              <input
                value={password}
                name="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button type="submit">SIGN IN</button>
          </div>
        </form>
        <p>
          Create an account?{" "}
          <span>
            <Link to="/register">Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
