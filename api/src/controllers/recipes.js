//const { API_KEY } = process.env;
const { Recipe, Diets } = require("../db.js");
const axios = require("axios");
const { Op } = require("sequelize");
const db = require("../db.js");
const API_KEY = "d413740024684c3ea2f0c267b5f29ec8";
// para presentar : 0c3461e7cf7c436f9c8f1615d6433998
//b12256479e1143308220e14ed0f40900
//c437c991033243b59e8e402cc7ffda84
//81c89abda23647658e85266b87ad521b
// 261e6769e47344e493eca2ed9d45013e
//9f440dd04a2343038eca6f08e042722d
//d413740024684c3ea2f0c267b5f29ec8
async function ApiCall() {
  //funciona la api call
  try {
    const recipesApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    const informationFromApi = recipesApi.data.results.map((e) => {
      return {
        id: e.id, //voy a identificar el id de los creados fijandome si tiene guion o no
        title: e.title,
        diet: e.diets,
        image: e.image,
        healthScore: e.healthScore,
        summary: e.summary.replace(/<[^>]*>?/g, ""), //quito los <b> que estan en el summary y los remplazo por ""
        steps: e.analyzedInstructions
          .map((r) => r.steps.map((s) => s.step))
          .flat(2)
          .join(""),
      };
    });
    return informationFromApi;
  } catch (e) {
    console.log("fallo la call a la api");

    (e) => console.log(e);
  }
}

async function getRecipes(req, res, next) {
  // una funcion que devuelva un array de objetos de tanto la api como de la base de datos
  const { name } = req.query;
  if (!name) {
    try {
      const apiInf = await ApiCall();
      const dbInf = await Recipe.findAll({ include: Diets });
      const realdbInf = dbInf.map((e) => {
        return {
          id: e.id, //voy a identificar el id de los creados fijandome si tiene guion o no
          title: e.title,
          diet: e.diets.map((e) => e.name),
          image: e.image,
          healthScore: e.healthScore,
          summary: e.summary,
          steps: e.steps,
        };
      });
      const totalInf = realdbInf.concat(apiInf);

      res.status(200).send(totalInf);
    } catch (e) {
      console.log("no agarra info correctamente");
    }
  } else {
    try {
      const apiInf = await ApiCall();
      const dbInf = await Recipe.findAll();
      const totalInf = dbInf.concat(apiInf); // ahora tengo toda la informacion en total info y busco a partir de ahi
      const searchRecipe = totalInf.filter((e) =>
        e.title.toUpperCase().includes(name.toUpperCase())
      );
      res.status(200).send(searchRecipe);
    } catch (e) {
      console.log("no busca uno en especifico", e);
      res.json({ msg: "No se encontro la receta pedida" });
    }
  }
}

async function getDetailRecipe(req, res, next) {
  const { id } = req.params;
  try {
    const apiInf = await ApiCall();
    const dbInf = await Recipe.findAll({ include: Diets });
    const realdbInf = dbInf.map((e) => {
      return {
        id: e.id, //voy a identificar el id de los creados fijandome si tiene guion o no
        title: e.title,
        diet: e.diets.map((e) => e.name),
        image: e.image,
        healthScore: e.healthScore,
        summary: e.summary,
        steps: e.steps,
      };
    });
    const totalInf = realdbInf.concat(apiInf);
    const idRecipe = totalInf.filter((e) => e.id == id); // tengo que poner doble por que si es estricta como viene como string
    // no filtra correctamente
    console.log(idRecipe);
    idRecipe ? res.send(idRecipe) : res.send({ msg: "The id is invalid" });
  } catch (e) {
    console.log("fallo apicall o el findAll de recipes");
    res.status(404).json({ msg: "The id is invalid" });
  }
}

module.exports = {
  getRecipes,
  getDetailRecipe,
};
