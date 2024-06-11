import { useState } from "react";
import "./CategoriesShop.css";

// Dummy data
const CATEGORIES = ["all", "iphone", "ipad", "mac", "airpod", "mouse", "other"];

const CategoriesShop = (props) => {
  const [active, setActive] = useState("all");

  const clickHandler = (category) => {
    setActive(category);
    props.onFilter(category);
  };

  return (
    <div className="CS-wrap">
      <h3 className="CS-title">Categories</h3>
      <ul className="CS-ul">
        {CATEGORIES.map((category, id) => {
          const activeClasses = category === active ? "darkcolor" : "";
          return (
            <li
              key={id}
              className={`CS-li ${activeClasses}`}
              onClick={() => clickHandler(category)}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoriesShop;
