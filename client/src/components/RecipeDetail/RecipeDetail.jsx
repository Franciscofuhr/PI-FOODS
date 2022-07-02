import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail } from "../../redux/actions";

const RecipeDetail = ({ match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();
  let detailedRecipe = useSelector((state) => state.recipeDetail);

  console.log(detailedRecipe.image);
  useEffect(() => {
    // despacho la action que va a llenar el estado global de detailedRecipe
    dispatch(getRecipeDetail(id));
  }, [dispatch]);

  return (
    <div>
      {detailedRecipe ? (
        <>
          <h1> {detailedRecipe.title}</h1>
          <h5> HealthScore:{detailedRecipe.healthScore}</h5>
          <img src={detailedRecipe.image} alt={detailedRecipe.title} />
          <span>
            <h2>Summary:</h2>
            <h5> {detailedRecipe.summary}</h5>
          </span>
          {detailedRecipe.diet
            ? detailedRecipe.diet.map((diets) => <h6>{diets}</h6>)
            : null}
          <h2>Steps:</h2>
          <h5>{detailedRecipe.steps}</h5>
        </>
      ) : null}
    </div>
  );
};

export default RecipeDetail;
