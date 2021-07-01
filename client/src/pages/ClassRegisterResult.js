import "./ClassRegisterResult.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StudentName from "../components/ClassFormComponents/StudentName";
import DownloadReportButton from "../components/ClassFormComponents/DownloadReportButton";
import RegionAndClassTitle from "../components/ClassFormComponents/RegionAndClassTitle";
import DateTime from "../components/ClassFormComponents/DateTime";

const ClassRegisterForm = () => {
  const { cohortId } = useParams();
  const { classId } = useParams();

  // hook for input students data
  const [studentsData, setStudentsData] = useState([]);
  const [regionAndClass, setRegionAndClass] = useState([]);
  const [dateAndTime, setDateAndTime] = useState([]);

  // get region's class's student's data from database
  useEffect(() => {
    axios
      .get(`/api/cohorts/${cohortId}/classes/${classId}/students-attendance`)
      .then((res) => {
        const newStudentsData = res.data.map((s) => {
          let defaultStudent;
          // a default student of region's class's student
          defaultStudent = {
            user_id: null,
            user_name: s.user_name,
            absence: s.attended,
            late: s.late_minutes,
            distractNotParticipate: s.distracted,
            cameraOnOff: s.camera_on,
            techIssue: s.connectivity_issues,
            comments: s.comments,
          };
          return defaultStudent;
        });

        const createdDateAndTime = res.data.map((date) => {
          const createdDate = {
            dateAndTime: date.updated_at,
          };
          return createdDate;
        });

        const rAndC = res.data.map((rC) => {
          const chosen = {
            region: rC.name,
            class: rC.cohort_number,
          };
          return chosen;
        });
        setStudentsData(newStudentsData);
        setDateAndTime(createdDateAndTime);
        setRegionAndClass(rAndC);
      })
      .catch((error) => {
        console.error(`Error while fetching data. \n${error} `);
      });
  }, [cohortId, classId]);

  return (
    <div className="formContainer">
      <div className="classTitle">
        <RegionAndClassTitle region={regionAndClass} />
        <DownloadReportButton className="DownloadReportButton" />
      </div>
      <DateTime dateAndTime={dateAndTime} />
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
            />
          ))}
        </div>
      </form>
    </div>
  );
};

export default ClassRegisterForm;