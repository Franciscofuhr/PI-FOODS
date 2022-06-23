import React from "react";
import NavBar from "./components/NavBar/NavBar";
import LandingPage from "./components/LandingPage/LandingPage";
import Recipes from "./components/Recipes/Recipes";
import { Route, Switch } from "react-router-dom";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe";

function App() {
  return (
    <>
      <Route path={"/recipes"} component={NavBar} />
      <Route exact path={"/"} component={LandingPage} />
      <Route exact path={"/recipes"} component={Recipes} />
      <Route path={"/recipes/:id"} component={RecipeDetail} />
      <Route exact path={"/recipes/createRecipe"} component={CreateRecipe} />
    </>
  );
}

export default App;
