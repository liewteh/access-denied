import "./ClassRegisterResult.css"
;
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

  const { cohortId } = useParams();
  const { classId } = useParams();

  // states required to input students' data
  const [studentsData, setStudentsData] = useState([]);
  const [regionAndClass, setRegionAndClass] = useState([]);
  const [dateAndTime, setDateAndTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [newClassId, setNewClassId] = useState(undefined);

  // function to close the popup that appears after form submission
  const togglePopup = () => {
    setIsOpen(!isOpen);
    if(isOpen) {
      history.push(`/cohorts/${cohortId}/classes/${newClassId}/students-attendance`);
    }
  };

  useEffect(() => {
    /*
     url to get students' data based on the view type.
     if the component isEditable then fetch only student names
     else fetch the whole attendance data
    */
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
    if (isEditable === false) {
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
        const newStudentsData = res.data.map((s) => {
          return { ...defaultStudent, ...s };
        });
        setStudentsData(newStudentsData);
      })
      .catch((error) => {
        console.error(`Error while fetching data. \n${error} `);
      });
  }, [cohortId, classId, isEditable]);

  // post new student attendance data
  const updateHandlerUserChange = (data, index) => {
    const newData = [...studentsData];
    newData[index] = data;
    setStudentsData(newData);
  };

  // form submit handler
  const submitHandler = (event) => {
    event.preventDefault();

    // create the class for the selected date
    axios
      .post(`/api/cohorts/${cohortId}/classes`, {
        date: dateAndTime,
        online_class: true,
      })
      .then(async (res) => {
        // create the students' attendance for the class
        // the classId is found in res.data.id
        setNewClassId(res.data.id);
        axios
          .post(`/api/cohorts/${cohortId}/classes/${res.data.id}`, {
            classAttendances: studentsData,
          })
          .catch((error) => {
            console.log(error);
          });
        togglePopup();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="classRegisterPage">
      <div className="classTitle">
        <RegionAndClassTitle region={regionAndClass} />
      </div>
      <div className="dateTime">
        {isEditable ? (
          <BasicDateTimePicker dateAndTimeValue={(e) => setDateAndTime(e)} />
        ) : (
          <DateTime dateAndTime={dateAndTime} />
        )}
      </div>
      <form className="attendanceForm bottomBorder topBorder">
        <div className="gridRow bottomBorder">
          <div className="grid-item studentName"> Student Name </div>
          <div className="grid-item"> Present </div>
          <div className="grid-item"> Late (minutes) </div>
          <div className="grid-item"> Distracted </div>
          <div className="grid-item"> Camera On </div>
          <div className="grid-item"> Tech Issues </div>
          <div className="grid-item comments"> Comments </div>
        </div>

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
              <p>The class attendance register entry completed.</p>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
};

export default ClassRegisterForm;
