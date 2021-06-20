import React from "react";
import { useState, useEffect } from "react";
import CohortList from "../components/CohortList";
import Footer from "../components/Footer";

const Cohorts = () => {
  const [cohortList, setCohortList] = useState([]);

  useEffect(() => {
    // function to fetch the cohort list from the server api
    const fetchCohorts = async () => {
      const response = await fetch("/api/cohorts");
      if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
      }
      const cohorts = await response.json();
      setCohortList(cohorts);
    };

    console.log("in useEffect.");
    fetchCohorts();
  }, []);

  return (
    <div>
      <CohortList cohortList={cohortList} />
      <Footer />
    </div>
  );
};

export default Cohorts;
