import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useInput from "../../hooks/useInput";
import baseUrl from "../../url/baseUrl";
import "./Auth_form.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpError, setSignUpError] = useState("");
  const [formError, setFormError] = useState(false);

  const {
    data: name,
    setData: setName,
    error: nameError,
  } = useInput((input) => input.length > 3);

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

  const {
    data: phone,
    setData: setPhone,
    error: phoneError,
  } = useInput((input) => input.length > 0 && !isNaN(input));

  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || phone === "") {
      return setFormError(true);
    } else if (!nameError && !emailError && !passwordError && !phoneError) {
      setFormError(false);
      const url = baseUrl + "/signup";

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
          mode: "cors",

          body: JSON.stringify({
            username: e.target.elements.username.value,
            email: e.target.elements.email.value,
            password: e.target.elements.password.value,
            Phone: e.target.elements.Phone.value,
          }),
        });

        if (response.status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
          );
        }

        if (response.status !== 201) {
          throw new Error("Creating a user failed!");
        }

        navigate("/login");
      } catch (err) {
        setSignUpError(err.message);
      }
    }
  };

  return (
    <div className="form_control_wrap">
      {formError && (
        <p className="error_auth">Please fill enough for all input!</p>
      )}
      {nameError && (
        <p className="error_auth">Name must be greater than 3 characters!</p>
      )}
      {emailError && <p className="error_auth">Email is invalid!</p>}
      {passwordError && <p className="error_auth">Password is invalid!</p>}
      {phoneError && <p className="error_auth">Phone is invalid!</p>}
      {signUpError && <p className="error_auth">{signUpError}</p>}
      <div className="form__wrap">
        <form className="form-control" onSubmit={handleSubmitSignup}>
          <h1>Sign Up</h1>
          <div>
            <div className="form_name">
              <input
                value={name}
                name="username"
                type="text"
                placeholder="Username"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form_Phone">
              <input
                name="Phone"
                value={phone}
                type="Phone"
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button type="submit">SIGN UP</button>
          </div>
        </form>
        <p>
          Login?{" "}
          <span>
            <Link to="/login">Click</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
