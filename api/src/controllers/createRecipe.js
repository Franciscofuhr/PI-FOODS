const { Recipe, Diets } = require("../db.js");

async function createRecipe(req, res, next) {
  const { title, summary, healthScore, steps, image, diet } = req.body;
  try {
    const newRecipe = await Recipe.create({
      title,
      summary,
      healthScore,
      steps,
      image,
    });
    const dietRecipe = await Diets.findAll({
      where: { name: diet },
    });
    newRecipe.addDiets(dietRecipe);
    res.json(newRecipe);
  } catch (e) {
    console.log("fallo para crear recetas");
    console.log(e);
    res.send(e);
  }
}

module.exports = {
  createRecipe,
};
