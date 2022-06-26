import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <Link to="/recipes">Home</Link>
      <Link to="/recipes/createRecipe">Create a recipe</Link>
    </div>
  );
};
export default NavBar;
