import {
  GET_DIET_RECIPES,
  GET_RECIPES,
  GET_RECIPES_ORDER_ALPHABETICAL,
  GET_RECIPES_ORDER_SCORE,
  GET_RECIPE_DETAIL,
  GET_RECIPES_SEARCH,
  ADD_RECIPE,
  GET_DIETS,
} from "../actions";

const initialState = {
  recipes: [],
  recipeDetail: {},
  recipesSearch: [],
  diets: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return { ...state, recipes: action.payload };

    case GET_RECIPE_DETAIL:
      return { ...state, recipeDetail: action.payload[0] }; // como va a traer de la api un array con un objeto solo
    //simplemente le digo que use de la posicion 0 para que a recipeDetail sea solo un objeto

    case GET_DIETS:
      return { ...state, diets: action.payload };
    case GET_RECIPES_ORDER_ALPHABETICAL: // supuse que los objetos en el array para ordenarlos alfabeticamente tiene la propiedad name
      return { ...state, recipes: action.payload };
    case GET_RECIPES_SEARCH:
      return { ...state, recipes: action.payload };
    case ADD_RECIPE:
      return { ...state };
    default:
      return { ...state };
  }
};

export default rootReducer;
