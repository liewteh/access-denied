import React from "react";
import { useHistory } from "react-router-dom";
import "./CohortCard.css";

const CohortCard = ({ cohort }) => {
  const history = useHistory();

  const routeChange = () => {
    let path = `/cohorts/${cohort.id}/classes`;
    history.push(path);
  };

  // const showClasses = () => {};
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className="infoCard" onClick={routeChange} role="link" tabIndex={0}>
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
      </div>
    </div>
  );
};

export default CohortCard;
