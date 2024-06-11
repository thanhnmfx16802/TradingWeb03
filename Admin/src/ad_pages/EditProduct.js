import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "./SideBar";
import Card from "./Card";
import baseUrl from "../url/baseUrl";

const EditProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [originalDataProduct, setOriginalDataProduct] = useState({
    name: "",
    category: "",
    short_desc: "",
    long_desc: "",
    img1: "",
    price: 0,
  });

  const [error, setError] = useState(null);
  const [saveMess, setSaveMess] = useState(null);

  useEffect(() => {
    const getOriginalDataProduct = async () => {
      try {
        const response = await fetch(`${baseUrl}/admin/edit/${productId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response.status !== 200) {
          throw new Error("Cannot fetch products from server");
        }
        const data = await response.json();
        setOriginalDataProduct(data);
      } catch (err) {
        console.log(err);
      }
    };
    getOriginalDataProduct();
  }, []);

  const handleChange = (e) => {
    setOriginalDataProduct((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !originalDataProduct.img1 ||
      !originalDataProduct.name ||
      !originalDataProduct.short_desc ||
      !originalDataProduct.long_desc ||
      !originalDataProduct.category ||
      !originalDataProduct.price
    ) {
      setError("Please fill enough information for all fields!");
      return;
    }
    setError(null);

    const newProduct = {
      ...originalDataProduct,
    };

    try {
      const response = await fetch(`${baseUrl}/admin/edit/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(newProduct),
        credentials: "same-origin",
        mode: "cors",
      });

      if (response.status !== 200) {
        throw new Error("Something went wrong with server");
      }

      setSaveMess(null);
      navigate("/products");
    } catch (err) {
      setSaveMess(err.message);
    }
  };

  return (
    <div className="d-flex gap-4 justify-content-center">
      <SideBar />
      <Card className="w-75 mt-4">
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        {saveMess && (
          <p style={{ color: "red", textAlign: "center" }}>{saveMess}</p>
        )}
        <h5 className="text-success mt-3 mb-4 text-center">Edit Product</h5>
        <div className="form-wrap d-flex justify-content-between gap-5  ms-5 me-5">
          <div className="d-flex flex-column w-50">
            <div className="d-flex flex-column mb-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={originalDataProduct.name}
                // border-0 removes all borders, border-bottom adds a bottom border to the input field
                className="border-0 border-bottom text-muted"
                onChange={handleChange}
              />
            </div>

            <div className="d-flex flex-column mb-4">
              <label htmlFor="short_desc">Short Description</label>
              <textarea
                type="text"
                id="short_desc"
                value={originalDataProduct.short_desc}
                className="fst-italic text-muted"
                onChange={handleChange}
              />
            </div>

            <div className="d-flex flex-column mb-4">
              <label htmlFor="img1">Image</label>
              <textarea
                type="text"
                id="img1"
                value={originalDataProduct.img1}
                placeholder="Please put image urls here"
                className="fst-italic text-muted"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="d-flex flex-column w-50">
            <div className="d-flex flex-column mb-4">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                value={originalDataProduct.category}
                className="border-0 border-bottom text-muted "
                onChange={handleChange}
              />
            </div>

            <div className="d-flex flex-column mb-4">
              <label htmlFor="long_desc">Long Description</label>
              <textarea
                type="text"
                id="long_desc"
                value={originalDataProduct.long_desc}
                className="fst-italic text-muted"
                onChange={handleChange}
              />
            </div>

            <div className="d-flex flex-column mb-4">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                value={originalDataProduct.price}
                className="border-0 border-bottom text-muted"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div>
          <button className="btn btn-success m-5" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </Card>
    </div>
  );
};
export default EditProduct;
