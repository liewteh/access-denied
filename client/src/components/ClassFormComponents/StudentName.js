import React from "react";
import ToggleButton from "./ToggleButton";
import TextArea from "./TextArea";

import "./StudentName.css";

// eslint-disable-next-line no-unused-vars
const StudentName = ({ isEditable, studentData, rowUpdate }) => {
  // console.log("in studentName");
  // console.log(studentData);
  const handleUpdate = (value, field) => {
    console.log("in handle update");
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
            onClick={(e) => handleUpdate(e, "attended")}
          />
        </div>
        <div>
          <input
            className="lateInput"
            type="number"
            min="0"
            defaultValue={studentData.late_minutes}
            disabled={!isEditable}
          />
        </div>
        <div>
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.distracted}
          />
        </div>
        <div>
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.camera_on}
          />
        </div>
        <div>
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.connectivity_issues}
          />
        </div>
        <div>
          {isEditable ? (
            <TextArea
              type="string"
              inputValue={(e) => handleUpdate(e.target.value, "comments")}
            ></TextArea>
          ) : (
            <span>{studentData.comments}</span>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentName;
