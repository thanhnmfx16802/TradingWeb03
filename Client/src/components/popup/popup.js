import ReactDOM from "react-dom";
import addDotsToPrice from "../home/price-format";
import React from "react";
import "./Popup.css";
import { useDispatch } from "react-redux";
import { popupActions } from "../../store/popup-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faXmark } from "@fortawesome/free-solid-svg-icons";

const Backdrop = () => {
  const dispatch = useDispatch();
  return (
    <div
      className="backdrop"
      onClick={() => dispatch(popupActions.hide_popup())}
    />
  );
};

const PopupContent = (props) => {
  const dispatch = useDispatch();
  return (
    <div id="popup" className="popup-bg">
      <div className="popup-content">
        <img className="popup-image" src={props.img1} alt={props.name} />

        <div className="popup-info-detail">
          <p className="popup-name">{props.name}</p>
          <p className="popup-price">{addDotsToPrice(props.price)}</p>
          <p className="popup-desc">{props.short_desc}</p>
          <button className="popup-button">
            <span>
              <FontAwesomeIcon icon={faCartShopping} />
            </span>
            View Detail
          </button>
        </div>
      </div>
      <div
        type="button"
        className="popup-close"
        onClick={() => dispatch(popupActions.hide_popup())}
      >
        <span>
          <FontAwesomeIcon icon={faXmark} />
        </span>
      </div>
    </div>
  );
};

const Popup = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}

      {ReactDOM.createPortal(
        <PopupContent
          name={props.name}
          price={props.price}
          img1={props.img1}
          short_desc={props.short_desc}
        />,
        document.getElementById("popupContent-root")
      )}
    </React.Fragment>
  );
};

export default Popup;
