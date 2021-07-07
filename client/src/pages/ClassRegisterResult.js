import "./ClassRegisterResult.css";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import RegionAndClassTitle from "../components/ClassFormComponents/RegionAndClassTitle";
import DateTime from "../components/ClassFormComponents/DateTime";
import StudentName from "../components/ClassFormComponents/StudentName";
import StudentNameSubmit from "../components/ClassFormComponents/StudentNameSubmit";

// default student object
const defaultStudent = {
  user_name: "",
  attended: true,
  camera_on: true,
  comments: "testing",
  connectivity_issues: false,
  distracted: false,
  late_minutes: 10,
};

const ClassRegisterForm = ( { isEditable }) => {
  console.log("isEditable");
  console.log(isEditable);
  const { cohortId } = useParams();
  const { classId } = useParams();

  // hook for input students data
  const [studentsData, setStudentsData] = useState([]);
  const [regionAndClass, setRegionAndClass] = useState([]);
  const [dateAndTime, setDateAndTime] = useState([]);

  // get student's attendance data from database
  useEffect(() => {
    let studentAttendanceUrl;
    if (isEditable) {
      studentAttendanceUrl = `/api/cohorts/${cohortId}/students`;
    } else {
      studentAttendanceUrl = `/api/cohorts/${cohortId}/classes/${classId}/students-attendance`;
    }

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
    if(isEditable === false) {
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
    } else {
      setDateAndTime("2021-12-22");
    }

    // fetch students' data
    axios
      .get(studentAttendanceUrl)
      .then((res) => {
        // console.log("in then");
        // console.log(res);
        const newStudentsData = res.data.map((s) => {
          // console.log("in map");
          // console.log("data from DB");
          // console.log(s);
          return { ...defaultStudent, ...s };
        });
        // console.log("newStudentsData");
        // console.log(newStudentsData);
        setStudentsData(newStudentsData);
      })
      .catch((error) => {
        console.error(`Error while fetching data. \n${error} `);
      });
  }, [cohortId, classId, isEditable]);

  // post new student attendance data
  const updateHandlerUserChange = (data, index) => {
    console.log("updateHandlerUserChange");
    console.log("data", data);
    const newData = [...studentsData];
    newData[index] = data;
    setStudentsData(newData);
  };

  console.log("newStudentData", studentsData);


  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit handler");
    console.log(studentsData);
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
          {studentsData.map((student, index) => {
            if (isEditable) {
              return (
                <StudentNameSubmit
                  key={index}
                  studentData={student}
                  rowUpdate={(data) => updateHandlerUserChange(data, index)}
                />
              );
            } else {
              return <StudentName key={index} studentData={student} />;
            }
          })}
        </div>
      </form>
      {isEditable && (
        <button type="submit" className="submitButton" onClick={submitHandler}>
          Submit
        </button>
      )}
    </div>
  );
};

export default ClassRegisterForm;
