import "./SubmitForm.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StudentName from "../components/SubmitForm/StudentName";
import DownloadReportButton from "../components/SubmitForm/DownloadReportButton";
import RegionAndClassTitle from "../components/SubmitForm/RegionAndClassTitle";
import BasicDateTimePicker from "../components/SubmitForm/BasicDateTimePicker";

const ClassRegisterForm = () => {
  const { cohortId } = useParams();

  // hook for input students data
  const [studentsData, setStudentsData] = useState([]);
  const [regionAndClass, setRegionAndClass] = useState([]);

  // get region's class's and student's name from database
  useEffect(() => {
    axios
      .get(`/api/submit/${cohortId}/submit-attendance`)
      .then((res) => {
        const newStudentsData = res.data.map((s) => {
          let defaultStudent;
          // a default student of region's class's student
          defaultStudent = {
            user_id: null,
            user_name: s.user_name,
            absence: null,
            late: null,
            distractNotParticipate: null,
            cameraOnOff: null,
            techIssue: null,
            comments: null,
          };
          return defaultStudent;
        });

        const rAndC = res.data.map((rC) => {
          const chosen = {
            region: rC.name,
            class: rC.cohort_number,
          };
          return chosen;
        });
        setStudentsData(newStudentsData);
        // setDateAndTime(createdDateAndTime);
        setRegionAndClass(rAndC);
      })
      .catch((error) => {
        console.error(`Error while fetching data. \n${error} `);
      });
  }, [cohortId]);

  // post new student attendance data
  const updateHandlerUserChange = (data, index) => {
    const newData = [...studentsData];
    newData[index] = data;
    setStudentsData(newData);
  };

  console.log("newStudentData", studentsData);

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
      <div className="classTitle">
        <RegionAndClassTitle regionName={regionAndClass} />
        <DownloadReportButton className="DownloadReportButton" />
      </div>
      <BasicDateTimePicker />
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
      </form>
      <button type="submit" className="submitButton" onClick={submitHandler}>
        Submit
      </button>
    </div>
  );
};

export default ClassRegisterForm;
