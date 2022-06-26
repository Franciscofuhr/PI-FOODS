import {
  GET_DIET_RECIPES,
  GET_RECIPES,
  GET_RECIPES_ORDER_ALPHABETICAL,
  GET_RECIPES_ORDER_SCORE,
  GET_RECIPE_DETAIL,
} from "../actions";

const initialState = {
  recipes: [],
  recipeDetail: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return { ...state, recipes: action.payload };

    case GET_RECIPE_DETAIL:
      return { ...state, recipeDetail: action.payload[0] }; // como va a traer de la api un array con un objeto solo
    //simplemente le digo que use de la posicion 0 para que a recipeDetail sea solo un objeto

    case GET_DIET_RECIPES:
      return { ...state, recipes: action.payload };
    case GET_RECIPES_ORDER_ALPHABETICAL: // supuse que los objetos en el array para ordenarlos alfabeticamente tiene la propiedad name
      // recipes.sort(function (a, b) {
      //   if (a.name > b.name) {
      //     return 1;
      //   }
      //   if (a.name < b.name) {
      //     return -1;
      //   }
      //   // a must be equal to b
      //   return 0;
      // });

      return { ...state, recipes: action.payload };
    default:
      return { ...state };
  }
};

export default rootReducer;
