import "./CohortsClasses.css";
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ClassList from "../components/ClassList";
import Footer from "../components/Footer";

const CohortClasses = () => {
  const { cohortId } = useParams();

  const [classList, setClassList] = useState([]);

  const history = useHistory();

  const routeChange = () => {
    console.log("in route change function.");
    console.log(cohortId);
    let path = `/cohorts/${cohortId}/classRegisterForm`;
    history.push(path);
  };

  useEffect(() => {
    // function to fetch the cohort list from the server api
    const fetchClasses = async () => {

      const response = await fetch(`/api/cohorts/${cohortId}/classes`);
      if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
      }

      const classes = await response.json();
      setClassList(classes);
    };

    console.log("in useEffect.");
    fetchClasses();
  }, [cohortId]);

  return (
    <div className="classPage">
      <h1 className="cohortClassPageHeading">Cohort Classes</h1>
      <ClassList classList={classList} />
      <button onClick={routeChange} role="link">Add New Class</button>
      <Footer />
    </div>
  );
};

export default CohortClasses;
