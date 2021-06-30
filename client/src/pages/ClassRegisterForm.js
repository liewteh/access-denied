import "./ClassRegisterForm.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/ClassFormComponents/Header";
import StudentName from "../components/ClassFormComponents/StudentName";
import Footer from "../components/Footer";
import DownloadReportButton from "../components/ClassFormComponents/DownloadReportButton";
import RegionAndClassTitle from "../components/ClassFormComponents/RegionAndClassTitle";
import DateTime from "../components/ClassFormComponents/DateTime";
import BasicDateTimePicker from "../components/ClassFormComponents/BasicDateTimePicker";

const ClassRegisterForm = () => {
  const { cohortId } = useParams();
  const { classId } = useParams();

  /* test submit or result form */
  let testAddSubmitForm = false;

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
          /* test submit or result form */
          if (!testAddSubmitForm) {
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
          } else {
            // a default student of region's class's student
            defaultStudent = {
              user_id: null,
              user_name: s.user_name,
              absence: null,
              late: "",
              distractNotParticipate: null,
              cameraOnOff: null,
              techIssue: null,
              comments: "",
            };
          }
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
  }, [cohortId]);

    // for submit form
    const updateHandlerUserChange = (data, index) => {
      const newData = [...studentsData];
      newData[index] = data;
      setStudentsData(newData);
    };

  // for submit form
  const submitHandler = (e) => {
    e.preventDefault();
    /* test submit or result form */
    if (!testAddSubmitForm) {
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
    }
  };

  return (
    <div className="formContainer">
      <div className="HeaderContainer">
        <Header />
      </div>
      <div className="classTitle">
        <RegionAndClassTitle region={regionAndClass} />
        <DownloadReportButton className="DownloadReportButton" />
      </div>
      {/* /* test submit or result form */}
      <DateTime dateAndTime={dateAndTime} hidden={!testAddSubmitForm} />
      <BasicDateTimePicker hidden={testAddSubmitForm} />
      {/*  */}
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
              /* test submit or result form */
              testAddSubmitForm={testAddSubmitForm}
              rowUpdate={(data) => updateHandlerUserChange(data, index)}
            />
          ))}
        </div>
        <button
          type="submit"
          className="submitButton"
          onClick={submitHandler}
        >
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
