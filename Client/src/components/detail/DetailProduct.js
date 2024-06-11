// import RenderImg from "./RenderImg";
import { useState } from "react";
import addDotsToPrice from "../home/price-format";
import DetailForm from "./DetailForm";

import "./DetailProduct.css";

const DetailProduct = (props) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [showDesc, setShowDesc] = useState(true);

  const toggleHandler = () => {
    setShowDesc((prevState) => !prevState);
  };

  return (
    <section className="section_detail_wrap">
      <div className="detail_wrap">
        <div>
          {props.imagesList.map((img, i) => {
            return (
              <div key={i} onClick={() => setImageIndex(i)}>
                <img
                  src={img}
                  alt={`${props.product.name}-${i}`}
                  className="detail-photolist"
                />
              </div>
            );
          })}
        </div>
        <div>
          <img
            src={props.imagesList[imageIndex]}
            alt={`${props.product.name}-${imageIndex}`}
            className="detail-photo_click"
          />
        </div>
        <div>
          <h3>{props.product.name}</h3>
          <h4>{addDotsToPrice(props.product.price)}</h4>
          <p>{props.product.short_desc}</p>
          <p>
            <span className="detail_category">Category: </span>
            <span>{props.product.category}</span>
          </p>
          <DetailForm product={props.product} />
        </div>
      </div>
      <div>
        <button onClick={toggleHandler}>DESCRIPTION</button>
        {showDesc && (
          <div>
            <h5 className="detail_desc">Product Description</h5>
            <p style={{ whiteSpace: "pre-line", fontStyle: "italic" }}>
              {props.product.long_desc}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
export default DetailProduct;
