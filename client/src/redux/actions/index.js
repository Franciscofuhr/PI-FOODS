import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const POST_RECIPE = "POST_RECIPE";
export const GET_DIET_RECIPES = "GET_DIET_RECIPES";
export const GET_RECIPES_ORDER_SCORE = "GET_RECIPES_ORDER_SCORE";
export const GET_RECIPES_ORDER_ALPHABETICAL = "GET_RECIPES_ORDER_ALPHABETICAL";
const apiKey = "0c3461e7cf7c436f9c8f1615d6433998";
//"ae67ad501e6942dfb88ac8cdce7089bd"; // guardar en variable de entorno
//"261e6769e47344e493eca2ed9d45013e"; //
// ailu apikey "b12256479e1143308220e14ed0f40900"
//nehuen apikey "0c3461e7cf7c436f9c8f1615d6433998"
export const getRecipes = () => {
  return async function (dispatch) {
    console.log("entro a las actions");
    return axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`
      ) //aca iria la ruta del back por ahora solamente busco en la api
      .then((r) => {
        return r.data;
      })
      .then((d) => {
        return dispatch({ type: GET_RECIPES, payload: d.results });
      })
      .catch((e) => console.log(e));
  };
};

export const getRecipeDetail = (id) => {
  return async function (dispatch) {
    return axios
      .get(`https://api.spoonacular.com/recipes/${id}/information`) //aca iria ruta del back
      .then((r) => r.data)
      .then((d) => dispatch({ type: GET_RECIPE_DETAIL }))
      .catch((e) => console.log(e));
  };
};
