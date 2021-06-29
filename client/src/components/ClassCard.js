import React from "react";
import moment from "moment";
import "./ClassCard.css";

const ClassCard = ({ cohortClass }) => {
  const cohortClassDate = moment(cohortClass.date).format("MMM Do YY");

  return (
    <div className="infoCard">
      <div className="classDetails">
        <h2 className="className">
          {`Class Date: ${cohortClassDate}`}
        </h2>
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
