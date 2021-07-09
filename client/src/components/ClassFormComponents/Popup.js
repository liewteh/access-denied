import "./Popup.css";
import React from "react";

const Popup = (props) => {
  return (
    <div className="popup-box">
      <div className="box">
        <button className="close-icon" onClick={props.handleClose}>
          x
        </button>
        {props.content}
      </div>
    </div>
  );
};

export default Popup;
