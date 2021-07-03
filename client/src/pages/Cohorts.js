import "./Cohorts.css";
import React from "react";
import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import CohortList from "../components/CohortList";
import axios from "axios";

const Cohorts = () => {
  const [cohortList, setCohortList] = useState(null);

  useEffect(() => {
    // function to fetch the cohort list from the server api
    const fetchCohorts = async () => {
      const response = await axios.get("/api/cohorts");
      const cohorts = response.data;
      setCohortList(cohorts);
    };
    fetchCohorts();
  }, []);

  return (
    <div className="cohortPage">
      <h1 className="cohortPageHeading">Your Cohorts</h1>
      { cohortList
        ? <CohortList cohortList={cohortList} /> : <h2>Loading...</h2>
      }
    </div>
  );
};

export default Cohorts;
