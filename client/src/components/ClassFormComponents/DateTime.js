import React from "react";
import moment from "moment";
import "./DateTime.css";

const DateTime = ({ dateAndTime }) => {
  let displayDate;
  dateAndTime.map((date) => {
    displayDate = moment(date.dateAndTime).format("MMM Do YY HH:mm:ss");
  });
  return (
    <input className="dateInput" defaultValue={displayDate} disabled={true} />
  );
};

export default DateTime;
