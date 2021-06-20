import React from "react";
import { useState, useEffect } from "react";
import CohortList from "../components/CohortList";

const Cohorts = () => {
  const [cohortList, setCohortList] = useState([]);

  // function to fetch the cohort list from the server api
  const fetchCohorts = async () => {
    const response = await fetch("/api/cohorts");
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
    const cohorts = await response.json();
    return cohorts;
  };

  useEffect(async () => {
    console.log("in useEffect.");
    let cohorts;

    try {
      cohorts = await fetchCohorts();
    } catch (e) {
      console.error(e);
    }

    setCohortList(cohorts);
  }, []);

  return (
    <div>
      <CohortList cohortList={cohortList} />
    </div>
  );
};

export default Cohorts;
