import React from "react";
import ToggleButton from "./ToggleButton";
import TextArea from "./TextArea";

import "./StudentName.css";

// eslint-disable-next-line no-unused-vars
const StudentName = ({ studentData }) => {

  return (
    // <>
      <tr className="titleGridContainer">
        <td className="studentName">{studentData.user_name}</td>
        <td>
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.absence}
          />
        </td>
        <td>
          <input
            className="lateInput"
            type="number"
            min="0"
            defaultValue={studentData.late}
            disabled={true}
          />
        </td>
        <td>
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.distractNotParticipate}
          />
        </td>
        <td>
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.cameraOnOff}
          />
        </td>
        <td>
          <ToggleButton
            className="ToggleButtonContainer"
            defaultValue={studentData.techIssue}
          />
        </td>
        <td>
          <TextArea
            type="string"
            comment={studentData.comments}
          ></TextArea>
        </td>
      </tr>
    // </>
  );
};

export default StudentName;
