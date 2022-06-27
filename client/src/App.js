import React from "react";
import NavBar from "./components/NavBar/NavBar";
import LandingPage from "./components/LandingPage/LandingPage";
import Recipes from "./components/Recipes/Recipes";
import { Route, Switch } from "react-router-dom";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe";
import Diets from "./components/Diets/Diets";

function App() {
  return (
    <>
      <Route exact path={"/"} component={LandingPage} />
      <Route path={"/recipes"} component={NavBar} />
      <Route exact path={"/recipes"} component={Recipes} />
      <Route path={"/recipes/recipeDetail/:id"} component={RecipeDetail} />
      <Route exact path={"/recipes/createRecipe"} component={CreateRecipe} />
      <Route exact path={"/recipes/diets"} component={Diets} />
    </>
  );
}

export default App;
