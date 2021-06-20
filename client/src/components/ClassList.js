import React from "react";
import "./CohortList.css";

import ClassCard from "./ClasstCard";

const ClassList = ({ classList }) => {
  if (classList) {
    console.log("in class list");
    console.log(classList);
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
