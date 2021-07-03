import React from "react";

const RegionAndClassTitle = ({ region }) => {
  return (
    <div>
      <h3>
        <strong>{region[0]?.region}</strong>
      </h3>
      <h4>Class {region[0]?.class}</h4>
    </div>
  );
};

export default RegionAndClassTitle;
