import React from 'react'
import ToggleButtonOn from './ToggleButtonOn'
import ToggleButtonOff from './ToggleButtonOff'

import './StudentName.css'

const StudentName = ({firstName, lastName}) => {
    return (
      <>
        <div className="titleGridContainer">
          <div className="grid-item">
            {firstName} {lastName}
          </div>
          <div className="grid-item">
            <ToggleButtonOff className="ToggleButtonOffContainer" />
          </div>gi
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
          <div>
            <input type="string" placeholder="brief comments" />
          </div>
        </div>
      </>
    );
}

export default StudentName
