import "./product-list.css";
import { NavLink } from "react-router-dom";
import addDotsToPrice from "../home/price-format";

const ProductList = (props) => {
  return (
    <div id="product-list">
      {props.productShow.length > 0 &&
        props.productShow.map((prod, index) => {
          return (
            <div key={index} className="pl-detailPhoto">
              <NavLink to={`/detail/${prod._id}`}>
                <img src={prod.img1} alt={prod.name} className="pl-imgUrl" />
                <p className="pl-name">{prod.name}</p>
                <p className="pl-price">{addDotsToPrice(prod.price)}</p>
              </NavLink>
            </div>
          );
        })}
    </div>
  );
};

export default ProductList;
