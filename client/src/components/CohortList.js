import React from "react";
import "./CohortList.css";
import { Grid } from "@material-ui/core";

import CohortCard from "./CohortCard";

const CohortList = ({ cohortList }) => {
  if (cohortList) {
    console.log("cohortList", cohortList);
    return (
      <>
        <Grid container spacing={3} >
          {" "}
          {cohortList.map((cohort, index) => (
            <Grid item xs={12} md={4} sm={6} key={index}>
              <CohortCard cohort={cohort} key={index} />{" "}
            </Grid>
          ))}{" "}
        </Grid>{" "}
      </>
    );
  } else {
    return <div> Cohorts not found </div>;
  }
};

export default CohortList;
