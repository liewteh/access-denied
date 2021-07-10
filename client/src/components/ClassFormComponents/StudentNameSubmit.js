import React from "react";
import ToggleButton from "./ToggleButton";
import TextArea from "./TextArea";

const StudentNameSubmit = ({ studentData, rowUpdate }) => {
  const handleUpdate = (value, field) => {
    const newData = { ...studentData };
    newData[field] = value;
    rowUpdate(newData);
  };

  return (
    <>
      <div className="gridRow">
        <div className="grid-item studentName">{studentData.user_name}</div>
        <div className="grid-item">
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.attended}
            toggleValue={(e) => handleUpdate(e, "attended")}
          />
        </div>
        <div className="grid-item">
          <input
            className="lateInput"
            type="number"
            min="0"
            placeholder="minutes"
            onChange={(e) => handleUpdate(e.target.value, "late_minutes")}
          />
        </div>
        <div className="grid-item">
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.distracted}
            toggleValue={(e) => handleUpdate(e, "distracted")}
          />
        </div>
        <div className="grid-item">
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.camera_on}
            toggleValue={(e) => handleUpdate(e, "camera_on")}
          />
        </div>
        <div className="grid-item">
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.connectivity_issues}
            toggleValue={(e) => handleUpdate(e, "connectivity_issues")}
          />
        </div>
        <div className="grid-item comments">
          <TextArea
            type="string"
            onChange={(e) => handleUpdate(e.target.value, "comments")}
            className="textArea"
          ></TextArea>
        </div>
      </div>
    </>
  );
};

export default StudentNameSubmit;
