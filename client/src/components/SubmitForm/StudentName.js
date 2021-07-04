import React from "react";
import ToggleButton from "./ToggleButton";
import TextArea from "./TextArea";

import "./StudentName.css";

// eslint-disable-next-line no-unused-vars
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
            defaultValue={studentData.attended}
            toggleValue={(e) => handleUpdate(e, "attended")}
          />
        </div>
        <div>
          <input
            className="lateInput"
            type="number"
            min="0"
            placeholder="minutes"
            onChange={(e) => handleUpdate(e.target.value, "late_minutes")}
          />
        </div>
        <div>
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.distracted}
            toggleValue={(e) => handleUpdate(e, "distracted")}
          />
        </div>
        <div>
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.camera_on}
            toggleValue={(e) => handleUpdate(e, "camera_on")}
          />
        </div>
        <div>
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.connectivity_issues}
            toggleValue={(e) => handleUpdate(e, "connectivity_issues")}
          />
        </div>
        <div>
          <TextArea
            type="string"
            inputValue={(e) => handleUpdate(e.target.value, "comments")}
          ></TextArea>
        </div>
      </div>
    </>
  );
};

export default StudentName;
