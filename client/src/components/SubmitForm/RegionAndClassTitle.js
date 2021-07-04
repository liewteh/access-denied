import React from "react";

const RegionAndClassTitle = ({ regionName }) => {
  return (
    <div className="regionContainer">
      <h3><strong>{regionName[0]?.name}</strong></h3>
      <h4>Class {regionName[0]?.cohort_number}</h4>
    </div>
  );
};

export default RegionAndClassTitle;
