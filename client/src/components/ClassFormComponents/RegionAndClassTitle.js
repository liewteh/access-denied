import React from "react";

const RegionAndClassTitle = ({ region }) => {
  return (
    <>
      <h3>{region[0]?.region}</h3>
      <h4>Class {region[0]?.class}</h4>
    </>
  );
};

export default RegionAndClassTitle;
