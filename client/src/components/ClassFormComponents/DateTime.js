import React from "react";
import "./DateTime.css";

const DateTime = () => {
  const isoDateString = `Date: ${new Date().toISOString()}`;

  return <input className="dateInput" placeholder={isoDateString} />;
};

export default DateTime;
