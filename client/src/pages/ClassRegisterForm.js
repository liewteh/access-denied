import "./ClassRegisterForm.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/ClassFormComponents/Header";
import StudentName from "../components/ClassFormComponents/StudentName";
import Footer from "../components/Footer";
import DownloadReportButton from "../components/ClassFormComponents/DownloadReportButton";
import RegionAndClassTitle from "../components/ClassFormComponents/RegionAndClassTitle";
import DateTime from "../components/ClassFormComponents/DateTime";

const ClassRegisterForm = () => {
  // hook for input students data
  const [studentsData, setStudentsData] = useState([]);

  // get region's class's student's data from database
  useEffect(() => {
    axios
      .get(`/api/students`)
      .then((res) => {
        const newStudentsData = res.data.map((s) => {
          // a default student of region's class's student
          const defaultStudent = {
            user_id: null,
            user_name: s.user_name,
            absence: false,
            late: 0,
            distractNotParticipate: false,
            cameraOnOff: true,
            techIssue: false,
            comments: "",
          };
          return defaultStudent;
        });
        setStudentsData(newStudentsData);
      })
      .catch((error) => {
        console.error(`Error while fetching data. \n${error} `);
      });
  }, []);

  const updateHandlerUserChange = (data, index) => {
    const newData = [...studentsData];
    newData[index] = data;
    setStudentsData(newData);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // post students data to api
    axios
      .post(`api/1/class_attendance`, {
        body: studentsData,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
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
      <DateTime />
      <div className="titleGridContainer">
        <div className="grid-item"> Student Name </div>
        <div className="grid-item"> Absence </div>
        <div className="grid-item"> Late </div>
        <div className="grid-item"> Distract / Not Participate </div>
        <div className="grid-item"> Camera On / Off </div>
        <div className="grid-item"> Tech Issues </div>
        <div className="grid-item"> Comments </div>
      </div>
      <form>
        <div className="studentNameContainer">
          {studentsData.map((student, index) => (
            <StudentName
              key={index}
              studentData={student}
              rowUpdate={(data) => updateHandlerUserChange(data, index)}
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
