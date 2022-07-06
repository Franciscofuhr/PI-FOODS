import React from "react";
import { Link } from "react-router-dom";
import d from "../LandingPage/LandingPage.module.css";
const LandingPage = () => {
  return (
    <div className={d.landingpage}>
      <div className={d.containerWelcome}>
        <h1 className={d.text}>
          Change your diet with
          <span className={d.texthealthier}> Healthier</span>
        </h1>
        <div>
          <Link to={"/recipes"}>
            <button className={d.buttonstart}>Start!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
