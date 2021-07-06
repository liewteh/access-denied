import React from "react";
import moment from "moment";
import "./DateTime.css";

const DateTime = ({ dateAndTime }) => {
  let displayDate;

  displayDate = moment(dateAndTime).format("MMM Do YYYY");
  return (
    <input
      className="dateInput"
      value={displayDate}
      disabled={true}
    />
  );
};

export default DateTime;
