import React from "react";
import { Link } from "react-router-dom";

const RecipesCard = (props) => {
  return (
    <div>
      <Link to={`/recipes/${props.id}`}>
        <h3>{props.title}</h3>
      </Link>
      <img src={props.image} alt={props.title} />
      {props.diets?.map((dietas) => (
        <div>
          <h5>{dietas}</h5>
        </div>
      ))}
    </div>
  );
};

export default RecipesCard;
