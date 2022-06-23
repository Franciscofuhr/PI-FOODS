import React from "react";
import { Link } from "react-router-dom";
import Mainimage from "../../Pictures/cooking.png";
import d from "../LandingPage/LandingPage.module.css";
const LandingPage = () => {
  return (
    <div>
      <img id={d.img} src={Mainimage} alt="cooking" />
      <h1 className={d.text}> Bienvenidos</h1>
      <span>
        <Link to={"/recipes"}>
          <button>ingresar!</button>
        </Link>
      </span>
    </div>
  );
};
export default LandingPage;
