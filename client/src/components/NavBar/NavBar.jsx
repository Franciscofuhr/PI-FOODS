import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes } from "../../redux/actions";
import c from "./NavBar.module.css";

const NavBar = () => {
  const dispatch = useDispatch();

  const backToHome = () => {
    dispatch(getRecipes());
  }; //asi cada vez que vuelve a home se vuelvan a renderizar los componentes
  return (
    <div className={c.nav}>
      <div className={c.home}>
        <Link to="/" className={c.linksland}>
          {" "}
          Healthier{" "}
        </Link>
        <Link
          id="Home"
          className={c.links}
          to="/recipes"
          onClick={() => backToHome()}
        >
          <i class="fa-solid fa-house"></i> Home
        </Link>
      </div>
      <div className={c.dietcreat}>
        <Link className={c.linksdietcreat} to="/recipes/diets">
          <i class="fa-solid fa-list"></i> Diets
        </Link>
        <Link className={c.linksdietcreat} to="/recipes/createRecipe">
          <i class="fa-solid fa-circle-plus"></i> Create a recipe
        </Link>
      </div>
    </div>
  );
};
export default NavBar;
