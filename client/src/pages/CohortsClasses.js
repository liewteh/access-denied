import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ClassList from "../components/ClassList";

const CohortClasses = () => {
  const { cohortId } = useParams();

  const [classList, setClassList] = useState([]);

  // function to fetch the cohort list from the server api
  const fetchClasses = async () => {
    const response = await fetch(`/api/cohorts/${cohortId}/classes`);
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
    const classes = await response.json();
    return classes;
  };

  useEffect(async () => {
    console.log("in useEffect.");
    let classes;

    try {
      classes = await fetchClasses();
    } catch (e) {
      console.error(e);
    }

    setClassList(classes);
  }, []);

  return (
    <div>
      <ClassList classList={classList} />
      <button>Add News Class</button>
    </div>
  );
};

export default CohortClasses;
