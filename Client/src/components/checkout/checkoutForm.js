import useInput from "../../hooks/useInput";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../url/baseUrl";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const {
    data: fullName,
    setData: setFullName,
    error: nameError,
  } = useInput((input) => input.length > 3);

  const {
    data: email,
    setData: setEmail,
    error: emailError,
  } = useInput((input) => input.length > 0 && input.includes("@"));

  const {
    data: phone,
    setData: setPhone,
    error: phoneError,
  } = useInput((input) => input.length > 3 && !isNaN(input));

  const {
    data: address,
    setData: setAddress,
    error: addressError,
  } = useInput((input) => input.length > 3);

  const productListInfo = cart.map((prod) => {
    return { productId: prod.productId, quantity: prod.quantity };
  });

  const orderHandler = async (e) => {
    e.preventDefault();

    const order = {
      fullname: fullName,
      email: email,
      phone: phone,
      address: address,
      totalPrice: totalPrice,
      products: productListInfo,
      delivery: "Waiting for progressing",
      status: "Waiting for pay",
      cartItems: cart,
    };
    try {
      const response = await fetch(baseUrl + "/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        credentials: "same-origin",
        mode: "cors",

        body: JSON.stringify(order),
      });

      if (response.status !== 201) {
        throw new Error("Cannot create order!");
      }
      alert("Order Successfully!");
      navigate("/shop");
    } catch (err) {
      console.log(err);
    }
  };

  // function to setup disabled for reserve button
  const isFormInvalid = () => {
    return nameError || emailError || phoneError || addressError;
  };

  return (
    <form className="Co_form_detail" onSubmit={orderHandler}>
      <div className="Co_input">
        <label className="Co_label">Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={fullName}
          placeholder="Enter Your Full Name Here!"
          onChange={(e) => setFullName(e.target.value)}
        />
        {nameError && (
          <p style={{ color: "red" }}>
            Name must be greater than 3 characters!
          </p>
        )}
      </div>

      <div className="Co_input">
        <label className="Co_label">Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter Your Email Here!"
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && (
          <p style={{ color: "red" }}>Please input valid email format</p>
        )}
      </div>

      <div className="Co_input">
        <label className="Co_label">Phone Number:</label>
        <input
          type="number"
          name="phone"
          value={phone}
          placeholder="Enter Your Phone Number Here!"
          onChange={(e) => setPhone(e.target.value)}
        />
        {phoneError && (
          <p style={{ color: "red" }}>
            Phone must be greater than 3 characters and is number type
          </p>
        )}
      </div>

      <div className="Co_input">
        <label className="Co_label">Address:</label>
        <input
          type="text"
          name="address"
          value={address}
          placeholder="Enter Your Address Here!"
          onChange={(e) => setAddress(e.target.value)}
        />
        {addressError && (
          <p style={{ color: "red" }}>
            Address must be greater than 3 characters!
          </p>
        )}
      </div>

      <button
        type="submit"
        className={`${isFormInvalid() ? "disabled" : ""} `}
        disabled={isFormInvalid()}
      >
        Place order
      </button>
    </form>
  );
};

export default CheckoutForm;
