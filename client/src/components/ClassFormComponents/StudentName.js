import React from "react";
import ToggleButton from "./ToggleButton";
import TextArea from "./TextArea";

import "./StudentName.css";

// eslint-disable-next-line no-unused-vars
const StudentName = ({ studentData }) => {

  return (
    <>
      <div className="titleGridContainer">
        <div className="studentName">{studentData.user_name}</div>
        <div>
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.absence}
          />
        </div>
        <div>
          <input
            className="lateInput"
            type="number"
            min="0"
            defaultValue={studentData.late}
            disabled={true}
          />
        </div>
        <div>
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.distractNotParticipate}
          />
        </div>
        <div>
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.cameraOnOff}
          />
        </div>
        <div>
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.techIssue}
          />
        </div>
        <div>
          <TextArea
            type="string"
            comment={studentData.comment}
          ></TextArea>
        </div>
      </div>
    </>
  );
};

export default StudentName;
