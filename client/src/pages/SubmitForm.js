import "./SubmitForm.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StudentName from "../components/SubmitForm/StudentName";
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
            user_name: s.user_name,
            attended: true,
            late_minutes: null,
            distracted: false,
            camera_on: true,
            connectivity_issues: false,
            comments: null,
            created_at: null,
          };
          return defaultStudent;
        });
        setStudentsData(newStudentsData);
      })
      .catch((error) => {
        console.error(`Error while fetching data. \n${error} `);
      });
  }, [cohortId]);

  useEffect(() => {
    axios
      .get(`/api/submit/${cohortId}/submit-attendance`)
      .then((res) => {
        const rAndC = res.data.map((rC) => {
          const chosen = {
            name: rC.name,
            cohort_number: rC.cohort_number,
          };
          return chosen;
        });
        // setDateAndTime(createdDateAndTime);
        setRegionAndClass(rAndC);
      })
      .catch((error) => {
        console.error(`Error while fetching data. \n${error} `);
      });
  }, [cohortId]);


  // date and time handler
  const dateAndTimeHandleUpdate = (value, field) => {
    const newDate = [...studentsData];
    newDate[field] = value;
    setStudentsData(newDate);
  };

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
      </div>
      <BasicDateTimePicker
        dateAndTimeValue={(e) => dateAndTimeHandleUpdate(e, "created_at")}
      />
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
