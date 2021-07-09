import React from "react";
import ToggleButton from "./ToggleButton";
import TextArea from "./TextArea";

import "./StudentName.css";

const StudentName = ({ studentData }) => {
  return (
    <>
      <div className="titleGridContainer">
        <div className="studentName">{studentData.user_name}</div>
        <div>
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.attended}
          />
        </div>
        <div>
          <input
            className="lateInput"
            type="number"
            min="0"
            defaultValue={studentData.late_minutes}
            disabled={true}
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
          <TextArea type="string" defaultValue={studentData.comments} disabled={true}></TextArea>
        </div>
      </div>
    </>
  );
};

export default StudentName;
