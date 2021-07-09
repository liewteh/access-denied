import React from "react";

const RegionAndClassTitle = ({ region }) => {
  return (
    <div>
      <h3>
        <strong>{region.region}</strong>
      </h3>
      <h4>Class {region.class}</h4>
    </div>
  );
};

export default RegionAndClassTitle;
