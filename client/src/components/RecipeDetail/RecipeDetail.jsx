import React from "react";
import { useDispatch } from "react-redux";

const RecipeDetail = ({ match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();

  return (
    <div>
      <h1>detalles de la receta</h1>
    </div>
  );
};

export default RecipeDetail;
