import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailProduct from "../detail/DetailProduct";
import RelatedProduct from "../detail/RelatedProduct";
import baseUrl from "../../url/baseUrl";
import "./DetailPage.css";

function DetailPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const params = useParams();

  // Fetch data synchronously
  useEffect(() => {
    fetch(`${baseUrl}/detail/${params.productId}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong with fetch products!");
        }
        return response.json();
      })
      .then((productItem) => {
        setProducts(productItem);

        setLoading(false); // Data is available, set loading to false
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.productId]);

  if (loading) {
    // Show a loading indicator or message
    return <div>Loading...</div>;
  }

  const selectProd = products.selectProd;

  const relatedProd = products.relatedProd;

  const imagesList = [
    selectProd.img1,
    selectProd.img2,
    selectProd.img3,
    selectProd.img4,
  ];

  return (
    <div className="detail_page">
      <DetailProduct imagesList={imagesList} product={selectProd} />
      <RelatedProduct product={relatedProd} />
    </div>
  );
}

export default DetailPage;
