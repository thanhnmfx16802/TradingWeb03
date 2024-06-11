import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import Card from "./Card";
import addDotsToPrice from "../components/price-format";
import baseUrl from "../url/baseUrl";

const Products = () => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.loginAdmin.role);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [success, setSuccess] = useState(null);
  const [products, setProducts] = useState([]);
  const [showProdWhenSearchBlank, setShowProdWhenSearchBlank] = useState(false);
  const [originalProdForSearch, setoriginalProdForSearch] = useState([]);
  useEffect(() => {
    const getproducts = async () => {
      try {
        const response = await fetch(baseUrl + "/admin/products", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (response.status === 404) {
          throw new Error("No product available");
        }
        if (response.status !== 200) {
          throw new Error("Something went wrong with server!");
        }
        const data = await response.json();

        setProducts(data);
        setoriginalProdForSearch(data);
      } catch (err) {
        setError(err.message);
      }
    };
    getproducts();
  }, [success, showProdWhenSearchBlank]);
  // search feature
  const handleSearch = (e) => {
    let searchValue = e.target.value;

    console.log(searchValue);
    if (searchValue === "") {
      setShowProdWhenSearchBlank((prevState) => !prevState);
    }

    if (searchValue !== "") {
      const searchResult = originalProdForSearch.filter(
        (prod) =>
          prod.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          prod.category.toLowerCase().includes(searchValue.toLowerCase())
      );

      setProducts(searchResult);
      console.log("search", searchResult);
      console.log(products);
    }
  };

  const handleDeleteProduct = async (id) => {
    alert("Do you want to delete this product?");
    try {
      const response = await fetch(baseUrl + "/admin/delete-product/" + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        credentials: "same-origin",
        mode: "cors",
      });
      if (response.status === 403) {
        throw new Error(
          "Cannot delete this product because this product exist in other order"
        );
      }
      if (response.status !== 200) {
        throw new Error("Internal server error!");
      }
      setNotice(null);
      const data = await response.json();
      setSuccess(data.message);
    } catch (err) {
      setNotice(err.message);
    }
  };

  return (
    <div className="d-flex gap-4 justify-content-center">
      <SideBar />
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {!error && (
        <div className="mt-5">
          {notice && <p className="text-danger text-center ">{notice}</p>}

          <Card className="card_trans">
            <div className="mb-3">
              <h1 className="fs-5 text-muted">Products</h1>
              <input
                className="form-control w-25"
                name="search"
                onChange={handleSearch}
                placeholder="Enter search"
              />
            </div>

            <table className="trans-table-product">
              <thead>
                <tr className="trans-head">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Category</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod, i) => {
                  return (
                    <tr key={i}>
                      <td>{prod._id}</td>
                      <td>{prod.name}</td>
                      <td>{addDotsToPrice(prod.price)}</td>
                      <td>
                        <img
                          src={prod.img1}
                          alt={prod.name}
                          style={{ width: "95px" }}
                        />
                      </td>
                      <td>{prod.category}</td>

                      <td
                        className="d-flex gap-1 align-items-center"
                        style={{ height: "116px" }}
                      >
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => {
                            if (role !== "Admin") {
                              return alert(
                                "Only admin can modify product information!"
                              );
                            }
                            navigate(`/edit/${prod._id}`);
                          }}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => {
                            if (role !== "Admin") {
                              return alert("Only admin can delete product!");
                            }
                            handleDeleteProduct(prod._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      )}
    </div>
  );
};
export default Products;
