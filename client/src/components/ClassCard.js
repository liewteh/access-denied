import React from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import "./ClassCard.css";

const ClassCard = ({ cohortClass }) => {
  const history = useHistory();

  const routeChange = () => {
    let path = `/cohorts/${cohortClass.cohort_id}/classes/${cohortClass.id}/students-attendance`;
    history.push(path);
  };
  const cohortClassDate = moment(cohortClass.date).format("MMM Do YY");

  return (
    <div className="infoCard" onClick={routeChange} role="link">
      <div className="classDetails">
        <h2 className="className">{`Class Date: ${cohortClassDate}`}</h2>
        {/* <ul className="classDetailsList">
          <li>
            <span className="classDetailType">Cohort ID: </span>
            {cohortClass.cohort_id}
          </li>
          <li>
            <span className="classDetailType">Class Date: </span>
            {cohortClassDate}
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default ClassCard;
