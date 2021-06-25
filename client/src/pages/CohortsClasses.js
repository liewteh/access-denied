import "./CohortsClasses.css";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ClassList from "../components/ClassList";
import Footer from "../components/Footer";
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const CohortClasses = () => {
  const { cohortId } = useParams();

  const [classList, setClassList] = useState([]);

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

    fetchClasses();
  }, [cohortId]);

  return (
    <div className="classPage">
     <div className="classes-header">
     <img className='small-logo' src='https://syllabus.codeyourfuture.io/img/logo.png' alt='img' ></img>
      <h1 className="classes-heading">Cohort Classes</h1>
      <AccountBoxIcon className='avatar' fontSize="large" style={{color: "green"}}  />
      
     </div>
     <div className='class-container'>
      <ClassList classList={classList} />
     </div> 
      
      
      <Footer />
    </div>
  );
};

export default CohortClasses;
