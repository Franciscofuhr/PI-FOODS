import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes, getRecipeSearch } from "../../redux/actions";
import c from "./NavBar.module.css";

const NavBar = () => {
  const dispatch = useDispatch();

  const backToHome = () => {
    dispatch(getRecipes());
  }; //asi cada vez que vuelve a home se vuelvan a renderizar los componentes
  return (
    <div className={c.nav}>
      <div>
        <Link
          id="Home"
          className={c.links}
          to="/recipes"
          onClick={() => backToHome()}
        >
          Home
        </Link>
      </div>
      <Link className={c.links} to="/recipes/diets">
        Diets
      </Link>
      <Link className={c.links} to="/recipes/createRecipe">
        Create a recipe
      </Link>
    </div>
  );
};
export default NavBar;
