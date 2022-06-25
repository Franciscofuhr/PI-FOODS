const { getDiets } = require("../controllers/diets.js");
const { Router } = require("express");
const router = Router();

router.get("/", getDiets);

module.exports = router;
