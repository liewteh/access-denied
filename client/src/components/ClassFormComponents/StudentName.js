import React from "react";
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
      <div className="titleGridContainer">
        <div className="studentName">{studentData.user_name}</div>
        <div>
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={false}
            toggleValue={(e) => handleUpdate(e, "absence")}
          />
        </div>
        <div>
          <input
            className="lateInput"
            type="integer"
            placeholder="minutes"
            onChange={(e) => handleUpdate(e.target.value, "late")}
          />
        </div>
        <div>
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={false}
            toggleValue={(e) => handleUpdate(e, "distractNotParticipate")}
          />
        </div>
        <div>
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={true}
            toggleValue={(e) => handleUpdate(e, "cameraOnOff")}
          />
        </div>
        <div>
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={false}
            toggleValue={(e) => handleUpdate(e, "techIssue")}
          />
        </div>
        <div>
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
