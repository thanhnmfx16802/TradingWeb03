import { useEffect, useState } from "react";
import ProductList from "../shop/ProductList";
import CategoriesShop from "../shop/CategoriesShop";
import "./shoppage.css";
import baseUrl from "../../url/baseUrl";

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Shop";
  }, []);

  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await fetch(baseUrl + "/products", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        });

        if (response.status === 404) {
          throw new Error("Can't find product!");
        }

        if (response.status !== 200) {
          throw new Error("Please login to discover all products! ");
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

  const filterhandler = (prodName) => {
    setCategory(prodName);
  };

  let filterProducts = products;
  if (category !== "all") {
    filterProducts = products.filter((prod) => prod.category === category);
  }

  return (
    <div id="shoppage">
      <section>
        <h2 className="shoppage-title">Shop</h2>
      </section>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <section className="shoppage-item">
        <CategoriesShop onFilter={filterhandler} />

        {products.length !== 0 && <ProductList productShow={filterProducts} />}
      </section>
    </div>
  );
}

export default ShopPage;
