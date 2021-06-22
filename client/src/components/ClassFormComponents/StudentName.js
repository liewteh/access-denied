import React from 'react'
import ToggleButtonOn from './ToggleButtonOn'
import ToggleButtonOff from './ToggleButtonOff'

import './StudentName.css'

const StudentName = ({studentName}) => {
    return (
      <>
        <div className="tableHeader">
          <div className="grid-item">{studentName}</div>
          <div className="grid-item">
            <ToggleButtonOff className="ToggleButtonOffContainer" />
          </div>
          <div className="grid-item">
            <input className="lateInput" type="integer" placeholder="minutes" />
          </div>
          <div className="grid-item">
            <ToggleButtonOff className="ToggleButtonOffContainer" />
          </div>
          <div className="grid-item">
            <ToggleButtonOn className="ToggleButtonOnContainer" />
          </div>
          <div className="grid-item">
            <ToggleButtonOff className="ToggleButtonOffContainer" />
          </div>
          <div className="grid-item">
            <input type="string" placeholder="brief comments" />
          </div>
        </div>
      </>
    );
}

export default StudentName
