import React from "react";
import { Link } from "react-router-dom";
import "./CohortCard.css";

const CohortCard = ({ cohort }) => {
  return (
    <div className="infoCard">
      <div className="cohortDetails">
        <h2 className="cohortName">
          {`${cohort.region_name} Class ${cohort.cohort_number}`}
        </h2>
        <ul className="cohortDetailsList">
          <li>
            <span className="cohortDetailType">Region: </span>
            {cohort.region_name}
          </li>
          <li>
            <span className="cohortDetailType">Cohort Number: </span>
            {cohort.cohort_number}
          </li>
        </ul>
        <Link to={`/cohorts/${cohort.id}/classes`}><button className="cohort-btn">Go to classes</button></Link>
      </div>
    </div>
  );
};

export default CohortCard;
