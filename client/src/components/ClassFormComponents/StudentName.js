import React from "react";
import ToggleButton from "./ToggleButton";
import TextArea from "./TextArea";

import "./StudentName.css";

// eslint-disable-next-line no-unused-vars
const StudentName = ({ studentData, rowUpdate, testAddSubmitForm }) => {
  /* test submit or result form */
  if (!testAddSubmitForm) {
    const handleUpdate = (value, field) => {
      const newData = { ...studentData };
      newData[field] = value;
      rowUpdate(newData);
    };
  }

  return (
    <>
      <div className="titleGridContainer">
        <div className="studentName">{studentData.user_name}</div>
        <div>
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.absence}
            toggleValue={(e) => handleUpdate(e, "absence")}
          />
        </div>
        <div>
          <input
            readOnly
            className="lateInput"
            type="number"
            min="0"
            // placeholder={studentData.late}
            value={studentData.late}
            onChange={(e) => handleUpdate(e.target.value, "late")}
            disabled={!testAddSubmitForm}
          />
        </div>
        <div>
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.distractNotParticipate}
            toggleValue={(e) => handleUpdate(e, "distractNotParticipate")}
          />
        </div>
        <div>
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.cameraOnOff}
            toggleValue={(e) => handleUpdate(e, "cameraOnOff")}
          />
        </div>
        <div>
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.techIssue}
            toggleValue={(e) => handleUpdate(e, "techIssue")}
          />
        </div>
        <div>
          <TextArea
            type="string"
            readOnly
            comment={studentData.comment}
            onChange={(e) => handleUpdate(e.target.value, "comments")}
            disabledComment={testAddSubmitForm}
          ></TextArea>
        </div>
      </div>
    </>
  );
};

export default StudentName;
