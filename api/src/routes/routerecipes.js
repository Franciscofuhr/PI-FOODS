const { getRecipes } = require("../controllers/recipes");
const { createRecipe } = require("../controllers/createRecipe");
const { Router } = require("express");
const router = Router();

router.get("/", getRecipes);
router.post("/", createRecipe);

module.exports = router;
