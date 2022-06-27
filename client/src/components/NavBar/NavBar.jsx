import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes, getRecipeSearch } from "../../redux/actions";

const NavBar = () => {
  const dispatch = useDispatch();
  const [recipeSearch, setRecipeSearch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getRecipeSearch(recipeSearch));
    console.log("entra en el submit");
  };
  const handleOnChange = (e) => {
    setRecipeSearch(e.target.value);
  };
  const backToHome = () => {
    dispatch(getRecipes());
  }; //asi cada vez que vuelve a home se vuelvan a renderizar los componentes
  return (
    <div>
      <Link to="/recipes" onClick={() => backToHome()}>
        Home
      </Link>
      <Link to="/recipes/createRecipe">Create a recipe</Link>
      <Link to="/recipes/diets">Diets</Link>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className="label" htmlFor="title">
            Recipe:
          </label>
          <input
            type="text"
            id="recipeSearch"
            autoComplete="off"
            value={recipeSearch}
            onChange={(e) => handleOnChange(e)}
          />
          <button type="submit">SEARCH</button>
        </div>
      </form>
    </div>
  );
};
export default NavBar;
