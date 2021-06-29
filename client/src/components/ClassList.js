import React from "react";
import "./ClassList.css";

import ClassCard from "./ClassCard";

const ClassList = ({ classList }) => {
  if (classList) {
    return (
      <div className="classList">
        {classList.map((cohortClass, index) => (
          <ClassCard cohortClass={cohortClass} key={index} />
        ))}
      </div>
    );
  } else {
    return <div>Classes not found</div>;
  }
};

export default ClassList;
