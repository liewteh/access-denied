import "./CohortsClasses.css";
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ClassList from "../components/ClassList";
import Footer from "../components/Footer";

const CohortClasses = () => {
  const { cohortId } = useParams();

  const [classList, setClassList] = useState([]);
  const [cohortDetails, setCohortDetails] = useState(null);

  const history = useHistory();

  const routeChange = () => {
    let path = `/submit/${cohortId}/submit-attendance`;
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

      const response2 = await fetch(`/api/cohorts/${cohortId}`);
      if (!response2.ok) {
        const message = `An error has occurred: ${response2.status}`;
        throw new Error(message);
      }
      const details = await response2.json();
      setCohortDetails(details[0]);
    };

    fetchClasses();
  }, [cohortId]);

  return (
    <div className="classPage">
      <h1 className="cohortClassPageHeading">
        {cohortDetails && `${cohortDetails.region_name} Class ${cohortDetails.cohort_number}`}
      </h1>
      <ClassList classList={classList} />
      <button onClick={routeChange} role="link">Add New Class</button>
      <Footer />
    </div>
  );
};

export default CohortClasses;
