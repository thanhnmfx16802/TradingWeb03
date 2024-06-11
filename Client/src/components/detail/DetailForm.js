import "./DetailForm.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../url/baseUrl";

const DetailForm = (props) => {
  const navigate = useNavigate();
  const [inputQuan, setInputQuan] = useState("");

  const handleChange = (e) => {
    setInputQuan(e.target.value);
  };

  const addToCart = async (e) => {
    e.preventDefault();

    if (inputQuan < 1) {
      return;
    }

    const productAdd = {
      productId: props.product._id,
      quantity: +inputQuan,
    };

    try {
      const response = await fetch(baseUrl + "/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        credentials: "same-origin",
        mode: "cors",

        body: JSON.stringify(productAdd),
      });

      if (response.status === 404) {
        throw new Error("Product or user could not be found.");
      }

      if (response.status !== 200) {
        throw new Error("Something went wrong with server.");
      }

      navigate("/cart");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={addToCart}>
      <div className="detail_form_wrap">
        <div>
          <p>QUANTITY</p>
        </div>
        <input
          type="number"
          min="1"
          value={inputQuan}
          onChange={handleChange}
          placeholder="0"
        />
        <div>
          <button type="submit">ADD TO CART</button>
        </div>
      </div>
    </form>
  );
};

export default DetailForm;
