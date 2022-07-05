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

  let dietsSearch = useSelector((state) => state.diets);

  const [recipeSearch, setRecipeSearch] = useState("");

  let recipes = useSelector((state) => state.recipes);

  const [pageItems, setPageItems] = useState([]); //empieza con un estado inicial de un array vacio

  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    dispatch(getDiets());
    dispatch(getRecipes());
  }, [dispatch]); //despacho la accion para que el store se llene con las recetas

  useEffect(() => {
    setCurrentPage(1);
    setPageItems(recipes.slice(0, ITEMS_PER_PAGE));
  }, [recipes]);

  console.log(recipes);

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
          <div className={c.searchcontainer}>
            <input
              type="text"
              id="recipeSearch"
              autoComplete="off"
              placeholder="Search a recipe..."
              value={recipeSearch}
              onChange={(e) => handleOnChange(e)}
              className={c.searchtext}
            />

            <button type="submit" className={c.searchbutton}>
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </form>
      </div>
      <div>
        <div className={c.filters}>
          <h3 className={c.orderby}>Order by:</h3>
          <select
            //className={}
            onChange={(e) => {
              OrderAlphabetical(e);
            }}
          >
            <option selected disabled className={c.option}>
              Title
            </option>

            <option name="Al Order" value={1} className={c.option}>
              Alphabetical Order
            </option>
            <option name="RAl Order" value={-1} className={c.option}>
              Reverse Alphabetical Order
            </option>
          </select>
          <select
            // className={}
            onChange={(e) => {
              orderScore(e);
            }}
          >
            <option selected disabled className={c.option}>
              By score
            </option>

            <option value={1} className={c.option}>
              Best Scores
            </option>
            <option value={-1} className={c.option}>
              Lowest Scores
            </option>
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
                  <option
                    key={e.id}
                    name={e.name}
                    value={e.name}
                    className={c.option}
                  >
                    {e.name}
                  </option>
                ))
              : null}
          </select>
        </div>
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
        <div className={c.pagenumbers}>
          <button onClick={prevHandler} className={c.nextprev}>
            <i class="fa-solid fa-angle-left"></i> Previous Page
          </button>

          <h3 className={c.current}>{currentPage}</h3>
          <button onClick={nextHandler} className={c.nextprev}>
            Next Page <i class="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
