import React from "react";
// eslint-disable-next-line no-unused-vars
import { useHistory } from "react-router-dom";
import moment from "moment";
import "./CohortCard.css";

const ClassCard = ({ cohortClass }) => {
  const history = useHistory();

  const routeChange = () => {
    let path = `/classRegisterForm`;
    history.push(path);
  };
  const cohortClassDate = moment(cohortClass.date).format("MMM Do YY");

  return (
    <div className="infoCard" onClick={routeChange} role="link">
      <div className="cohortDetails">
        <h2 className="cohortName">
          {/* {`Cohort ID: ${cohortClass.cohort_id} Class Date: ${cohortClassDate}`} */}
          {`Class Date: ${cohortClassDate}`}
        </h2>
        {/* <ul className="cohortDetailsList">
          <li>
            <span className="cohortDetailType">Cohort ID: </span>
            {cohortClass.cohort_id}
          </li>
          <li>
            <span className="cohortDetailType">Class Date: </span>
            {cohortClassDate}
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default ClassCard;
