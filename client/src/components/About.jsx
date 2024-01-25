import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/about.css";

const About = () => {
  return (
    <div className="home-agenda section-container">
      <div className="home-max-width2 max-content-container">
        <div className="home-heading-container1">
          <h1 className="home-text11 heading2">About</h1>
        </div>
        <div className="about-body">
          <div className="about-body-website">
            You can register a complaint on this website about any open garbage
            dumps near you. Using this data the concerened authorities will take
            necessay actions to fix the issue.
          </div>
          <div className="about-body-card">
            <img src="/avatar.png" alt="none" />
            <p>
              I am Mayur Agarwal. This website, SUGAM is developed by me. This
              project is an approach to make our cities clean and healthy. <br />You can checkout my <u><a href="https://www.linkedin.com/in/mayur-agarwal-b5a41a209/">LinkdIn Profile Here</a></u>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
