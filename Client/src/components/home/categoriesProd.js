import "./categoriesProd.css";

const CategoriesProd = () => {
  return (
    <section className="categories">
      <p>Carefully created collections</p>
      <h5>Browse our categories</h5>
      <div className="categories-prod">
        {["iPhone", "Mac"].map((type, i) => {
          return (
            <div key={type} className="categories-item">
              <img
                src={`./images/product_${i + 1}.png`}
                alt={type}
                className="categoriesImg"
              />
            </div>
          );
        })}
      </div>
      <div className="categories-prod">
        {["iPad", "Apple Watch", "AirPods"].map((type, i) => {
          return (
            <div key={type} className="categories-item">
              <img
                src={`./images/product_${i + 3}.png`}
                alt={type}
                className="categoriesImg"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoriesProd;
