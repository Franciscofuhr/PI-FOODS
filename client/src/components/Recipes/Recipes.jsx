import React, { useEffect, useState } from "react";
import { getRecipes, getRecipesOrderAlphabetical } from "../../redux/actions";
import { connect, useDispatch, useSelector } from "react-redux";
import RecipesCard from "../RecipesCard/RecipesCard";
//import NavBar from "../NavBar/NavBar";

const Recipes = () => {
  const dispatch = useDispatch();
  const [pageItems, setPageItems] = useState([]); //empieza con un estado inicial de un array vacio
  const NUMBER_PAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const ITEMS_PER_PAGE = 9;
  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]); //despacho la accion para que el store se llene con las recetas
  const recipes = useSelector((state) => state.recipes);
  useEffect(() => {
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

  const OrderAlphabetical = (number) => {
    dispatch(getRecipesOrderAlphabetical(number));
  };

  console.log(pageItems, "page items");
  return (
    <>
      <div>
        <button onClick={() => OrderAlphabetical(1)}>A - Z</button>
        <button onClick={() => OrderAlphabetical(-1)}>Z - A</button>
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
        {pageItems?.map((r) => (
          <RecipesCard
            title={r.title}
            image={r.image}
            diets={r.diets}
            id={r.id}
          />
        ))}
      </div>
    </>
  );
};

export default Recipes;
