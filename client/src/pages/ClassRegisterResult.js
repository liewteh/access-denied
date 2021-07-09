import "./ClassRegisterResult.css";

import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import axios from "axios";

import RegionAndClassTitle from "../components/ClassFormComponents/RegionAndClassTitle";
import DateTime from "../components/ClassFormComponents/DateTime";
import BasicDateTimePicker from "../components/ClassFormComponents/BasicDateTimePicker";
import StudentName from "../components/ClassFormComponents/StudentName";
import StudentNameSubmit from "../components/ClassFormComponents/StudentNameSubmit";
import Popup from "../components/ClassFormComponents/Popup";

// default student object
const defaultStudent = {
  user_name: "",
  attended: true,
  camera_on: true,
  comments: "",
  connectivity_issues: false,
  distracted: false,
  late_minutes: 0,
};

const ClassRegisterForm = ( { isEditable }) => {
  const history = useHistory();

  // console.log("isEditable");
  // console.log(isEditable);
  const { cohortId } = useParams();
  const { classId } = useParams();

  // hook for input students data
  const [studentsData, setStudentsData] = useState([]);
  const [regionAndClass, setRegionAndClass] = useState([]);
  const [dateAndTime, setDateAndTime] = useState(new Date());
  const [newClassId, setNewClassId] = useState(classId);
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    if(isOpen) {
      history.push("/cohorts/");
    }
  };

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
    // console.log("updateHandlerUserChange");
    // console.log("data", data);
    const newData = [...studentsData];
    newData[index] = data;
    setStudentsData(newData);
  };

  // console.log("newStudentData", studentsData);

  const submitHandler = (event) => {
    event.preventDefault();
    // console.log("Submit Handler");
    // console.log(dateAndTime);

    // create the class for the selected date
    axios
      .post(`/api/cohorts/${cohortId}/classes`, {
        date: dateAndTime,
        online_class: true,
      })
      .then(async (res) => {
        // console.log(res);
        // console.log(res.data);
        setNewClassId(res.data.id);
        // console.log(newClassId);

        // create the students' attendance for the class
        axios
          .post(`/api/cohorts/${cohortId}/classes/${res.data.id}`, {
            classAttendances: studentsData,
          })
          .then((res) => {
            // console.log("attendances created!");
            // console.log(res);
            // console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
        togglePopup();
        // history.push("/cohorts/");

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
      {isEditable ? (
        <BasicDateTimePicker dateAndTimeValue={(e) => setDateAndTime(e)} />
      ) : (
        <DateTime dateAndTime={dateAndTime} />
      )}
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
      {isOpen && (
        <Popup
          content={
            <>
              <b>Class Created Successfully!</b>
              <p>
                The class attendance register entry completed.
              </p>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
};

export default ClassRegisterForm;
