import React from "react";
import moment from "moment";
import "./DateTime.css";

const DateTime = ({ dateAndTime }) => {
  const displayDate = moment(dateAndTime[0]?.dateAndTime).format(
    "MMM Do YY HH:mm:ss"
  );
  return (
    <input className="dateInput" defaultValue={displayDate} disabled={true} />
  );
};

export default DateTime;
