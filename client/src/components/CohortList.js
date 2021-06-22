import React from "react";
import "./CohortList.css";

import CohortCard from "./CohortCard";

const CohortList = ({ cohortList }) => {
  if (cohortList) {
    console.log("in cohort list");
    console.log(cohortList);
    return (
      <div className="cohortList">
        {cohortList.map((cohort, index) => (
          <CohortCard cohort={cohort} key={index} />
        ))}
      </div>
    );
  } else {
    return <div>Cohorts not found</div>;
  }
};

export default CohortList;
