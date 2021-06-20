import React from "react";
import Header from "../components/ClassFormComponents/Header.js";
import StudentName from "../components/ClassFormComponents/StudentName.js";
import Footer from "../components/Footer";
import StudentNames from "../TestData/Names.json";
import DownloadReportButton from "../components/ClassFormComponents/DownloadReportButton";
import RegionAndClassTitle from "../components/ClassFormComponents/RegionAndClassTitle.js";

import "./ClassRegisterForm.css";

const ClassRegisterForm = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("hello");
  };

  return (
    <div className="formContainer">
      <div className="HeaderContainer">
        <Header />
      </div>
      <div className="classTitle">
        <RegionAndClassTitle />
        <DownloadReportButton className="DownloadReportButton" />
      </div>
      <div className="titleGridContainer">
        <div className="grid-item">Student Name</div>
        <div className="grid-item">Absence</div>
        <div className="grid-item">Late</div>
        <div className="grid-item">Distract/Not Participate</div>
        <div className="grid-item">Camera On/Off</div>
        <div className="grid-item">Tech Issues</div>
        <div className="grid-item">Comments</div>
      </div>
      <form>
        <div className="studentNameContainer">
          {StudentNames.map((student, index) => (
            <StudentName
              firstName={student.firstName}
              lastName={student.lastName}
              key={index}
            />
          ))}
        </div>
        <button type="submit" className="submitButton" onClick={submitHandler}>
          Submit
        </button>
      </form>
      <div className="footer-component">
        <Footer />
      </div>
    </div>
  );
};

export default ClassRegisterForm;
