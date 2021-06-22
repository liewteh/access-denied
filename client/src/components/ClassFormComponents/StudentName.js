import React from 'react'
import ToggleButtonOn from './ToggleButtonOn'
import ToggleButtonOff from './ToggleButtonOff'

import './StudentName.css'

const StudentName = ({studentName}) => {
    return (
      <>
        <div className="titleGridContainer">
          <div className="studentName">
            {studentName}
          </div>
          <div>
            <ToggleButtonOff className="ToggleButtonOffContainer" />
          </div>
          <div>
            <input className="lateInput" type="integer" placeholder="minutes" />
          </div>
          <div>
            <ToggleButtonOff className="ToggleButtonOffContainer" />
          </div>
          <div>
            <ToggleButtonOn className="ToggleButtonOnContainer" />
          </div>
          <div>
            <ToggleButtonOff className="ToggleButtonOffContainer" />
          </div>
          <div>
            <input type="string" placeholder="brief comments" />
          </div>
        </div>
      </>
    );
}

export default StudentName
