import React from "react";
import { Link } from "react-router-dom";
import c from "./RecipesCard.module.css";

const RecipesCard = (props) => {
  return (
    <div className={c.cardcontainer}>
      <div className={c.titlecontainer}>
        <Link className={c.title} to={`/recipes/recipeDetail/${props.id}`}>
          <h3>{props.title}</h3>
        </Link>
      </div>
      <img className={c.image} src={props.image} alt={props.title} />
      <div className={c.dietscontainer}>
        {props.diet?.map((dietas) => (
          <div>
            <h5 id={dietas} className={c.dietas}>
              {dietas}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesCard;
