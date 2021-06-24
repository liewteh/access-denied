import React from "react";
// import { useState } from "react";
// import ToggleButtonOn from "./ToggleButtonOn";
import ToggleButton from "./ToggleButton";

import "./StudentName.css";

const StudentName = ({ studentData, rowUpdate }) => {
  const handleUpdate = (value, field) => {
    const newData = { ...studentData };
    newData[field] = value;
    rowUpdate(newData);
  };

  return (
    <>
      <div className="tableHeader">
        <div className="grid-item">{studentData.user_name}</div>
        <div className="grid-item">
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={false}
            toggleValue={(e) => handleUpdate(e, "absence")}
          />
        </div>
        <div className="grid-item">
          <input
            className="lateInput"
            type="integer"
            placeholder="minutes"
            onChange={(e) => handleUpdate(e.target.value, "late")}
          />
        </div>
        <div className="grid-item">
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={false}
            toggleValue={(e) => handleUpdate(e, "distractNotParticipate")}
          />
        </div>
        <div className="grid-item">
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={true}
            toggleValue={(e) => handleUpdate(e, "cameraOnOff")}
          />
        </div>
        <div className="grid-item">
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={false}
            toggleValue={(e) => handleUpdate(e, "techIssue")}
          />
        </div>
        <div className="grid-item">
          <input
            type="string"
            placeholder="brief comments"
            onChange={(e) => handleUpdate(e.target.value, "comments")}
          />
        </div>
      </div>
    </>
  );
};

export default StudentName;
