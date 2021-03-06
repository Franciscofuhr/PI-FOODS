const { getRecipes, getDetailRecipe } = require("../controllers/recipes");
const { createRecipe } = require("../controllers/createRecipe");
const { Router } = require("express");
const router = Router();

router.get("/", getRecipes);
router.get("/:id", getDetailRecipe);
router.post("/", createRecipe);

module.exports = router;
