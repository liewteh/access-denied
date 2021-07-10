import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Line } from "react-chartjs-2";
import moment from "moment";
import "./CohortsReport.css"

const CohortsReport = () => {
  const location = useLocation();
  const { cohortId } = location.state;
  const [classesData, setClassesData] = useState([]);

  useEffect(() => {
    // fetch cohort details
    axios
      .get(`/api/cohorts/${cohortId.cohortId}/cohortsReport`)
      .then((res) => {
        const data = res.data;
        setClassesData(data);
      })
      .catch((error) => {
        console.error(`Error while fetching data. \n${error} `);
      });
  }, [cohortId]);

  let dates = [];
  let studentsTotal = [];

  classesData.map((data) => {
    dates.push(moment(data.Date).format("MMM Do YYYY"));
    studentsTotal.push(data.Students);
  });

  const state = {
    labels: dates,
    datasets: [
      {
        label: "Total Students Attended",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: studentsTotal,
      },
    ],
  };

  return (
    <div className="report-container">
      <Line
        data={state}
        height={"95%"}
        options={{
          title: {
            display: true,
            text: "Total Students",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
            fontSize: 50,
          },
        }}
      />
    </div>
  );
};

export default CohortsReport;
