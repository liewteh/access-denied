import "./ClassRegisterResult.css";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import RegionAndClassTitle from "../components/ClassFormComponents/RegionAndClassTitle";
import DateTime from "../components/ClassFormComponents/DateTime";
import StudentName from "../components/ClassFormComponents/StudentName";

const ClassRegisterForm = () => {
  const { cohortId } = useParams();
  const { classId } = useParams();

  // hook for input students data
  const [studentsData, setStudentsData] = useState([]);
  const [regionAndClass, setRegionAndClass] = useState([]);
  const [dateAndTime, setDateAndTime] = useState([]);

  // get student's attendance data from database
  useEffect(() => {
    // fetch cohort details
    axios
      .get(`/api/cohorts/${cohortId}`)
      .then((res) => {
        const data = res.data;

        setRegionAndClass({
          region: data[0].region_name,
          class: data[0].cohort_number,
        });
      })
      .catch((error) => {
        console.error(`Error while fetching data. \n${error} `);
      });

    // fetch class details : class date
    axios
      .get(`/api/cohorts/classes/${classId}`)
      .then((res) => {
        const data = res.data;
        const classDate = data[0].date;
        setDateAndTime(classDate);
      })
      .catch((error) => {
        console.error(`Error while fetching data. \n${error} `);
      });

    // fetch students' data
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
        setStudentsData(newStudentsData);
      })
      .catch((error) => {
        console.error(`Error while fetching data. \n${error} `);
      });
  }, [cohortId, classId]);

  return (
    <div className="formContainer">
      <div className="classTitle">
        <RegionAndClassTitle region={regionAndClass} />
      </div>
      <DateTime dateAndTime={dateAndTime} />
      <div className="titleGridContainer">
        <div className="grid-item"> Student Name </div>
        <div className="grid-item"> Present </div>
        <div className="grid-item"> Late (minutes) </div>
        <div className="grid-item"> Distract / Not Participating </div>
        <div className="grid-item"> Camera On </div>
        <div className="grid-item"> Tech Issues </div>
        <div className="grid-item"> Comments </div>
      </div>
      <form>
        <div className="studentNameContainer">
          {studentsData.map((student, index) => (
            <StudentName key={index} studentData={student} />
          ))}
        </div>
      </form>
    </div>
  );
};

export default ClassRegisterForm;
