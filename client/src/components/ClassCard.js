import "./ClassCard.css";

import React from "react";
import { Link } from "react-router-dom";

import moment from "moment";

const ClassCard = ({ cohortClass }) => {
  const cohortClassDate = moment(cohortClass.date).format("MMM Do YY");

  return (
    <div className="infoCard">
      <div className="classDetails">
        <h2 className="className">{`Class Date: ${cohortClassDate}`}</h2>
        <Link
          to={`/cohorts/${cohortClass.cohort_id}/classes/${cohortClass.id}/students-attendance`}
        >
          Go to attendance record
        </Link>
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
