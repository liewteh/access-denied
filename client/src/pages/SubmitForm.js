import "./SubmitForm.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StudentName from "../components/SubmitForm/StudentName";
import DownloadReportButton from "../components/SubmitForm/DownloadReportButton";
import RegionAndClassTitle from "../components/SubmitForm/RegionAndClassTitle";
import BasicDateTimePicker from "../components/SubmitForm/BasicDateTimePicker";
import { ContactsTwoTone } from "@material-ui/icons";
import DateTime from "../components/ClassFormComponents/DateTime";

// default student object
const defaultStudent = {
  user_id: null,
  user_name: "",
  absence: false,
  late: 10,
  distractNotParticipate: false,
  cameraOnOff: false,
  techIssue: false,
  comments: "testing",
};

const ClassRegisterForm = ({ isEditable }) => {
  console.log("In ClassRegisterForm");
  const { cohortId } = useParams();
  const { classId } = useParams();

  // hook for input students data
  const [studentsData, setStudentsData] = useState([]);
  const [regionAndClass, setRegionAndClass] = useState([]);
  const [dateAndTime, setDateAndTime] = useState([]);

  // get region's class's and student's name from database
  useEffect(() => {
    let url;
    if (isEditable) {
      url = `/api/cohorts/${cohortId}/students`;
    } else {
      url = `/api/cohorts/${cohortId}/classes/${classId}/students-attendance`;
    }

    console.log("in useEffect");
    console.log(url);
    axios
      .get(url)
      .then((res) => {
        console.log("in then");
        console.log(res);
        const newStudentsData = res.data.map((s) => {
          console.log("in map");
          console.log(s);
          return { ...defaultStudent, ...s };
          // defaultStudent = { ...s };
          // a default student of region's class's student
          // defaultStudent = {
          //   user_id: null,
          //   user_name: s.user_name,
          //   attended: null,
          //   late_minutes: null,
          //   distracted: null,
          //   camera_on: null,
          //   connectivity_issues: null,
          //   comments: null,
          // };
          // return defaultStudent;
        });
        console.log("newStudentsData");
        console.log(newStudentsData);
        setStudentsData(newStudentsData);
      })
      .catch((error) => {
        console.error(`Error while fetching data. \n${error} `);
      });
  }, [classId, cohortId, isEditable]);

  // get region's class's data from database
  useEffect(() => {
    axios
      .get(`/api/cohorts/${cohortId}/classes/${classId}/students-attendance`)
      .then((res) => {
        const rAndC = res.data.map((rC) => {
          const chosen = {
            region: rC.name,
            class: rC.cohort_number,
          };
          return chosen;
        });
        setRegionAndClass(rAndC);
      })
      .catch((error) => {
        console.error(`Error while fetching data. \n${error} `);
      });
  }, [cohortId, classId]);

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
      .post("api/1/class_attendance", {
        body: studentsData,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let dateType;
  if (isEditable) {
    dateType = <BasicDateTimePicker />;
  } else {
    dateType = <DateTime dateAndTime={dateAndTime} />;
  }
  console.log("dateType");
  console.log(dateType);

  return (
    <div className="formContainer">
      <div className="classTitle">
        <RegionAndClassTitle regionName={regionAndClass} />
        <DownloadReportButton className="DownloadReportButton" />
      </div>
      {dateType}
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
