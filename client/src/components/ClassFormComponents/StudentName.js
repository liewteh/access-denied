import React from "react";
import ToggleButton from "./ToggleButton";
import TextArea from "./TextArea";

const StudentName = ({ studentData }) => {
  return (
    <>
      <div className="gridRow">
        <div className="grid-item studentName">{studentData.user_name}</div>
        <div className="grid-item">
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.attended}
          />
        </div>
        <div className="grid-item">
          <input
            className="lateInput"
            type="number"
            min="0"
            defaultValue={studentData.late_minutes}
            disabled={true}
          />
        </div>
        <div className="grid-item">
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.distracted}
          />
        </div>
        <div className="grid-item">
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.camera_on}
          />
        </div>
        <div className="grid-item">
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.connectivity_issues}
          />
        </div>
        <div className="grid-item comments">
          <TextArea
            type="string"
            defaultValue={studentData.comments}
            disabled={true}
            className="textArea"
          ></TextArea>
        </div>
      </div>
    </>
  );
};

export default StudentName;
