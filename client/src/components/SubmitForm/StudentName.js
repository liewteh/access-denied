import React from "react";
import ToggleButton from "./ToggleButton";
import TextArea from "./TextArea";

import "./StudentName.css";

// eslint-disable-next-line no-unused-vars
const StudentName = ({ studentData, rowUpdate }) => {
  console.log("inStudentName", studentData);
  
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
            defaultValue={true}
            toggleValue={(e) => handleUpdate(e, "absence")}
          />
        </div>
        <div>
          <input
            className="lateInput"
            type="number"
            min="0"
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
