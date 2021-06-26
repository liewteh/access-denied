import "./Cohorts.css";
import React from "react";
import { useState, useEffect } from "react";
import CohortList from "../components/CohortList";
import Footer from "../components/Footer";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

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

    fetchCohorts();
  }, []);

  return (
    <>
      <div className="header-container">
        <img
          className="small-logo"
          src="https://syllabus.codeyourfuture.io/img/logo.png"
          alt="img"
        ></img>

        <h1 className="cohortPageHeading">CYF Cohorts</h1>
        <AccountBoxIcon
          className="avatar"
          fontSize="large"
          style={{ color: "green" }}
        />
      </div>

      <div className="cohortPage">
        <div className="main-container">
          <CohortList cohortList={cohortList} />
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default Cohorts;
