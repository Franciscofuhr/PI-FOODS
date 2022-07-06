import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const POST_RECIPE = "POST_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const GET_RECIPES_ORDER_SCORE = "GET_RECIPES_ORDER_SCORE";
export const GET_RECIPES_ORDER_ALPHABETICAL = "GET_RECIPES_ORDER_ALPHABETICAL";
export const GET_RECIPES_SEARCH = "GET_RECIPES_SEARCH";
export const ADD_RECIPE = "ADD_RECIPE";
export const GET_DIET_RECIPES = "GET_DIET_RECIPES";

export const getRecipes = () => {
  return async function (dispatch) {
    console.log("entro a las actions");
    return axios
      .get(`/recipes`) // busco en el back
      .then((r) => {
        return r.data;
      })
      .then((d) => {
        return dispatch({ type: GET_RECIPES, payload: d });
      })
      .catch((e) => console.log(e));
  };
};

export const getRecipesOrderAlphabetical = (number) => {
  // en caso de que me llegue 1 por parametro ordena de A-Z Y sino alrevez
  return {
    type: GET_RECIPES_ORDER_ALPHABETICAL,
    payload: number,
  };
};

export const getRecipesOrderScore = (number) => {
  return { type: GET_RECIPES_ORDER_SCORE, payload: number };
};

export const getDietRecipes = (diet) => {
  return async function (dispatch) {
    console.log("entro a las actions");
    return axios
      .get(`/recipes`) // busco en el back
      .then((r) => {
        console.log(r.data, "pedido a el back");
        return r.data;
      })
      .then((d) => {
        return dispatch({ type: GET_DIET_RECIPES, payload: d, filter: diet });
      })
      .catch((e) => console.log(e));
  };
};

export const getRecipeDetail = (id) => {
  return async function (dispatch) {
    console.log("entro a la action de get recipes");
    return axios
      .get(`/recipes/${id}`) //aca iria ruta del back
      .then((r) => {
        console.log(r.data);
        return r.data;
      })
      .then((d) => dispatch({ type: GET_RECIPE_DETAIL, payload: d }))
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
  };
};

export const getRecipeSearch = (search) => {
  return (dispatch) => {
    axios
      .get(`/recipes?name=${search}`)
      .then((res) => res.data)
      .then((res) => dispatch({ type: GET_RECIPES_SEARCH, payload: res }))
      .catch((e) => {
        console.log("error buscando a las recetas");
        console.log(e);
      });
  };
};

export const getDiets = () => {
  return async function (dispatch) {
    return axios
      .get(`/diets`)
      .then((res) => dispatch({ type: GET_DIETS, payload: res.data }))
      .catch((e) => {
        console.log("error buscando las dietas");
        console.log(e);
      });
  };
};

export const addRecipe = (body) => {
  return async function (dispatch) {
    return axios
      .post(`/recipes`, body)
      .then((res) => dispatch({ type: ADD_RECIPE, payload: res }));
  };
};
