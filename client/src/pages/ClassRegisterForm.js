import "./ClassRegisterForm.css";
import React, { useState, useEffect } from "react";
import Header from "../components/ClassFormComponents/Header.js";
import StudentName from "../components/ClassFormComponents/StudentName.js";
import Footer from "../components/Footer";
import StudentNames from "../TestData/Names.json";
import DownloadReportButton from "../components/ClassFormComponents/DownloadReportButton";
import RegionAndClassTitle from "../components/ClassFormComponents/RegionAndClassTitle.js";

const defaultStudent = {
  user_id: null,
  absence: false,
  late: 0,
  distractNotParticipate: false,
  cameraOnOff: true,
  techIssue: false,
  comments: "",
};

const ClassRegisterForm = () => {
  const [students, setStudents] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  
  useEffect(() => {
      fetch(`/api/students`)
      .then((res) => {
          if (res.ok) {
              return res.json()
          } else {
              alert(res.status)
              alert("Error! Data not found")
          }
      })
      .then((data) => {
        const newStudentsData = data.map((s) => {
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
        })
          setStudents(data)
          setStudentsData(newStudentsData)
      })
      .catch((error) => {
          console.error("Error while fetching data");
      })
  }, [])

  const updateHandlerUserChange = (data, index) => {
      const newData = [...studentsData];
      newData[index] = data;
      setStudentsData(newData);
  }

  console.log(studentsData);

  const submitHandler = (e) => {
    e.preventDefault();
    // Default options are marked with *
    fetch(`/api/1/class_attendance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentsData)
    })
    .then(console.log)
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
      <form>
        <div className="tableHeader">
          <div className="grid-item"> Student Name </div>
          <div className="grid-item"> Absence </div>
          <div className="grid-item"> Late </div>
          <div className="grid-item"> Distract / Not Participate </div>
          <div className="grid-item"> Camera On / Off </div>
          <div className="grid-item"> Tech Issues </div>
          <div className="grid-item"> Comments </div>
        </div>
        {studentsData.map((student, index) => (
          <StudentName 
            studentData={student} 
            key={index} 
            rowUpdate={(data) => updateHandlerUserChange (data, index)} />
        ))}
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
