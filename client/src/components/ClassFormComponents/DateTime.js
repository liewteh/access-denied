import React from "react";
import moment from "moment";
import "./DateTime.css";

const DateTime = ({ dateAndTime }) => {
  // display date and time from api in readable format
  const displayDate = moment(dateAndTime[0]?.dateAndTime).format(
    "MMM Do YY HH:mm:ss"
  );
  return <input className="dateInput" value={displayDate} />;
};

export default DateTime;
