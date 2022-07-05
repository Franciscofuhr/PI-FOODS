const dataForDiets = require("../data-diets");

const { Recipe, Diets } = require("../db.js");

async function getDiets(req, res, next) {
  if ((await Diets.findAll()).length === 0) {
    try {
      // console.log(dataForDiets);
      const dietas = dataForDiets;
      for (let i = 0; i < dietas.length; i++) {
        await Diets.create({
          id: i,
          name: dietas[i].name,
          information: dietas[i].information,
        });
      }
      // const newDiet = await Diets.create({
      //   id: 1,
      //   name: "hola",
      //   information: "eso",
      // });
      const allDiets = await Diets.findAll();
      // console.log(allDiets);
      res.send(allDiets);
      // dataForDiets.map((e) =>
      //   await Diets.create({ name: e.name, information: e.information })
      // );

      // res.send({ msg: "la ruta anda bien", informacion: "eso" });
    } catch (e) {
      console.log("no se crea el get Diets");
      console.log(e);
    }
  } else {
    res.send(await Diets.findAll());
  }
}
module.exports = { getDiets };
