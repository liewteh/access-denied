import React from "react";
import "./DateTime.css";

const DateTime = ({ dateAndTime }) => {
  let displayDate = dateAndTime[0]?.dateAndTime;

  return <input className="dateInput" value={displayDate} />;
};

export default DateTime;
