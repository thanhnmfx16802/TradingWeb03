import addDotsToPrice from "../home/price-format";
import { NavLink } from "react-router-dom";

const RelatedProduct = (props) => {
  return (
    <div>
      <h5 className="detail_desc">Related Products</h5>
      <div className="detail_prod_related">
        {props.product.map((prod, index) => {
          return (
            <div key={index} className="detailPhotoList">
              <NavLink to={`/detail/${prod._id}`}>
                <img src={prod.img1} alt={prod.name} className="imgUrlDetail" />
                <p className="trending-name">{prod.name}</p>
                <p className="trending-price">{addDotsToPrice(prod.price)}</p>
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default RelatedProduct;
