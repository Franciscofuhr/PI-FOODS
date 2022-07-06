const { Recipe, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if title is null", (done) => {
        Recipe.create({
          summary: "resumen",
          healthScore: 88,
        })
          .then(() => done(new Error("It requires a valid title")))
          .catch(() => done());
      });
      it("should work when its a valid title", () => {
        Recipe.create({
          title: "Milanesa a la napolitana",
          summary: "resumen",
          healthScore: 88,
        })
          .then(() => done())
          .catch(() => done(new Error("should work when its a valid title")));
      });
    });
    describe("summary", () => {
      it("should throw an error if summary is null", (done) => {
        Recipe.create({
          title: "Milanesa a la napolitana",
          healthScore: 88,
        })
          .then(() => done(new Error("It requires a valid summary")))
          .catch(() => done());
      });
      it("should work when its a valid summary", () => {
        Recipe.create({
          title: "Milanesa a la napolitana",
          summary: "resumen",
          healthScore: 88,
        })
          .then(() => done())
          .catch(() => done(new Error("should work when its a valid summary")));
      });
    });
    describe("healthscore", () => {
      it("should throw an error if healthscore is invalid", (done) => {
        Recipe.create({
          title: "Milanesa a la napolitana",
          summary: "resumen",

          healthScore: "aaa",
        })
          .then(() => done(new Error("It requires a valid summary")))
          .catch(() => done());
      });
      it("should work when its a valid healthscore", () => {
        Recipe.create({
          title: "Milanesa a la napolitana",
          summary: "resumen",
          healthScore: 88,
        })
          .then(() => done())
          .catch(() =>
            done(new Error("should work when its a valid healthscore"))
          );
      });
    });
  });
});
