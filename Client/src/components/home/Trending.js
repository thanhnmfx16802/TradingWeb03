import { useEffect, useState } from "react";
import addDotsToPrice from "./price-format";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Popup from "../popup/popup";
import baseUrl from "../../url/baseUrl";

import "./trending.css";
import { popupActions } from "../../store/popup-slice";

const Trending = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.popup.isOpen);
  const nameProd = useSelector((state) => state.popup.name);
  const priceProd = useSelector((state) => state.popup.price);
  const img1Prod = useSelector((state) => state.popup.img1);
  const short_descProd = useSelector((state) => state.popup.short_desc);
  const [error, setError] = useState("");
  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await fetch(baseUrl + "/products", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        });

        if (response.status === 404) {
          throw new Error("Can't find trending product!");
        }

        if (response.status !== 200) {
          throw new Error("Login to see trending products. ");
        }
        setError(null);
        const productItem = await response.json();

        setProducts(productItem);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchProductData();
  }, []);

  return (
    <Fragment>
      {isOpen && (
        <Popup
          name={nameProd}
          price={priceProd}
          img1={img1Prod}
          short_desc={short_descProd}
        />
      )}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {products.length !== 0 && (
        <section id="trending" className="container-lg">
          <p className="trending-intro">Make the hard way</p>
          <h5>Top trending products</h5>
          <div className="detailPhotoWrap">
            {products.map((prod, index) => {
              return (
                <div
                  key={index}
                  className="detailPhotoList"
                  onClick={() =>
                    dispatch(
                      popupActions.show_popup({
                        name: prod.name,
                        price: prod.price,
                        img1: prod.img1,
                        short_desc: prod.short_desc,
                      })
                    )
                  }
                >
                  <img
                    src={prod.img1}
                    alt={prod.name}
                    className="imgUrlDetail"
                  />
                  <p className="trending-name">{prod.name}</p>
                  <p className="trending-price">{addDotsToPrice(prod.price)}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default Trending;
