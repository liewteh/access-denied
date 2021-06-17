import React from 'react'
import DownloadReportButton from './DownloadReportButton';

import "./Header.css";

const Header = () => {
    return (
      <div className="HeaderContainer">
        <img
          className="HeaderLogo"
          src="https://syllabus.codeyourfuture.io/img/logo.png"
          alt="CYFLogo"
        />
        <DownloadReportButton className="DownloadReportButton" />
      </div>
    );
}

export default Header
