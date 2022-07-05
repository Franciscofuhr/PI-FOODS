import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail } from "../../redux/actions";
import r from "./RecipeDetail.module.css";

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
    <div className={r.componentcontainer}>
      {detailedRecipe ? (
        <>
          <div className={r.bodycontainer}>
            <div className={r.headdetail}>
              <h1 className={r.title}> {detailedRecipe.title}</h1>
              <h5 className={r.health}>
                HealthScore:{detailedRecipe.healthScore}
              </h5>
            </div>
            <div className={r.imagecontainer}>
              <img
                className={r.image}
                src={detailedRecipe.image}
                alt={detailedRecipe.title}
              />
            </div>
            <div className={r.summstepscontainer}>
              <h2 className={r.typetext}>Summary</h2>
              <h5 className={r.typeinformation}> {detailedRecipe.summary}</h5>
            </div>
            <div className={r.dietscontainer}>
              <h2 className={r.dietname}>Diets</h2>
              <div className={r.totaldiets}>
                {detailedRecipe.diet
                  ? detailedRecipe.diet.map((diets) => (
                      <h6 className={r.diets}>{diets}</h6>
                    ))
                  : null}
              </div>
            </div>
            <div className={r.summstepscontainer}>
              <h2 className={r.typetext}>Steps</h2>
              {detailedRecipe.steps ? (
                <h5 className={r.typeinformation}>{detailedRecipe.steps}</h5>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default RecipeDetail;
