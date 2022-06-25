const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routeRecipe = require("./routerecipes");
const routediets = require("./routediets");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", routeRecipe);
router.use("/diets", routediets);
module.exports = router;
