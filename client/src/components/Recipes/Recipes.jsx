import React, { useEffect, useState } from "react";
import {
  getDietRecipes,
  getDiets,
  getRecipes,
  getRecipeSearch,
  getRecipesOrderAlphabetical,
  getRecipesOrderScore,
} from "../../redux/actions";
import { connect, useDispatch, useSelector } from "react-redux";
import RecipesCard from "../RecipesCard/RecipesCard";
import c from "./Recipes.module.css";

//import NavBar from "../NavBar/NavBar";

const Recipes = () => {
  const dispatch = useDispatch();

  let dietsSearch = useSelector((state) => state.dietsSearch);

  const [recipeSearch, setRecipeSearch] = useState("");

  const [ordered, setOrder] = useState("");

  let recipes = useSelector((state) => state.recipes);

  const [pageItems, setPageItems] = useState([]); //empieza con un estado inicial de un array vacio

  const NUMBER_PAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    dispatch(getDiets());
    dispatch(getRecipes());
  }, [dispatch]); //despacho la accion para que el store se llene con las recetas

  const diets = useSelector((state) => state.diets);

  useEffect(() => {
    setCurrentPage(1);
    setPageItems(recipes.slice(0, ITEMS_PER_PAGE));
    console.log("entra al Use Effect");
  }, [recipes]);

  console.log(recipes);
  console.log(diets, "diets");

  const [currentPage, setCurrentPage] = useState(1); //armo un estado local con los elementos de la pagina y el numero del current page

  const prevHandler = () => {
    const prevPage = currentPage - 1;

    if (prevPage <= 0) return;

    const initialItem = (prevPage - 1) * ITEMS_PER_PAGE;
    const currentItems = (currentPage - 1) * ITEMS_PER_PAGE; //tengo que poner -1 en ambos por que sino me tomaria los
    console.log("initial", initialItem, "  current", currentItems); //mismos que en la anterior pagina

    setPageItems(recipes.slice(initialItem, currentItems)); //al ser un slice muestro las anteriores 9 recetas
    setCurrentPage(prevPage);
  };

  const nextHandler = () => {
    const nextPage = currentPage + 1;
    const initialItem = currentPage * ITEMS_PER_PAGE;
    const currentItems = nextPage * ITEMS_PER_PAGE;
    if (currentItems >= recipes.length + 9) return;
    setPageItems(recipes.slice(initialItem, currentItems)); //al ser un slice muestro las siguientes 9 recetas
    setCurrentPage(nextPage);
  };

  const numberPage = (page) => {
    const initialItem = (page - 1) * ITEMS_PER_PAGE;
    const currentItems = page * ITEMS_PER_PAGE;
    setPageItems(recipes.slice(initialItem, currentItems));
    setCurrentPage(page);
  };

  const OrderAlphabetical = (e) => {
    console.log("entra a Order Alphabetical");
    dispatch(getRecipesOrderAlphabetical(e.target.value)); //me va a dar 1 o -1
    setCurrentPage(1);
    setPageItems(recipes.slice(0, ITEMS_PER_PAGE));
  };

  const orderScore = (e) => {
    e.preventDefault();
    dispatch(getRecipesOrderScore(e.target.value));
    setPageItems(recipes.slice(0, ITEMS_PER_PAGE));
    setCurrentPage(1);
  };
  const filterDiets = (e) => {
    if (e.target.value === "None") {
      return dispatch(getRecipes());
    }
    dispatch(getDietRecipes(e.target.value));
  };

  const naturalOrder = () => {
    dispatch(getRecipes());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getRecipeSearch(recipeSearch));
    console.log("entra en el submit");
  };
  const handleOnChange = (e) => {
    setRecipeSearch(e.target.value);
  };

  console.log(pageItems, "page items");
  return (
    <div className={c.recipesbackground}>
      <div>
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
      <div>
        Order by:
        <select
          //className={}
          onChange={(e) => {
            OrderAlphabetical(e);
          }}
        >
          <option>Title</option>

          <option name="Al Order" value={1}>
            Alphabetical Order
          </option>
          <option name="RAl Order" value={-1}>
            Reverse Alphabetical Order
          </option>
        </select>
        <select
          // className={}
          onChange={(e) => {
            orderScore(e);
          }}
        >
          <option>By score</option>

          <option value={1}>Best Scores</option>
          <option value={-1}>Lowest Scores</option>
        </select>
        <select
          // className={}
          onChange={(e) => {
            filterDiets(e);
          }}
        >
          <option value="None">By Diet</option>
          {dietsSearch
            ? dietsSearch.map((e) => (
                <option key={e} name={e} value={e}>
                  {e}
                </option>
              ))
            : null}
        </select>
        <span>
          <button onClick={prevHandler}>Previous Page</button>
          {NUMBER_PAGES?.map((e) => (
            <button key={e} onClick={() => numberPage(e)}>
              {e}
            </button>
          ))}
          {currentPage}
          <button onClick={nextHandler}>Next Page</button>
        </span>
        <div className={c.showrecipes}>
          {pageItems?.map((r) => (
            <RecipesCard
              key={r.id}
              title={r.title}
              image={r.image}
              diet={r.diet}
              id={r.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
