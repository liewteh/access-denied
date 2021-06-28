import "./Cohorts.css";
import React from "react";
import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import CohortList from "../components/CohortList";
import Footer from "../components/Footer";
import axios from "axios";

const Cohorts = () => {
  const [cohortList, setCohortList] = useState(null);

  useEffect(() => {
    // function to fetch the cohort list from the server api
    const fetchCohorts = async () => {
      const response = await axios.get("/api/cohorts");
      console.log("response of fetch cohorts is: ");
      console.log(response);
      const cohorts = response.data;
      console.log(cohorts);
      // if (!response.ok) {
      //   const message = `An error has occurred: ${response.status}`;
      //   throw new Error(message);
      // }
      setCohortList(cohorts);
      console.log(cohorts);
    };
    console.log("in useEffect.");
    fetchCohorts();
  }, []);

  return (
    <div className="cohortPage">
      <h1 className="cohortPageHeading">Your Cohorts</h1>
      { cohortList
        ? <CohortList cohortList={cohortList} /> : <h2>Loading...</h2>
      }
      <Footer />
    </div>
  );
};

export default Cohorts;
