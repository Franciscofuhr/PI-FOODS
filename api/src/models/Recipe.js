const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("recipe", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // se le asigna un valor defaul del tipo UUID
      primaryKey: true,
    },
    title: {
      // seria el name pero para sincronizar con la api la llamo "title"
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    analyzedInstructions: {
      // ES UN ARRAY QUE ADENTRO TIENE UN OBJETO CON UNA PROPIEDAD STEPS(array) EN DONDE
      // que muestran los STEPS,cada STEPS es un objeto con las propiedades number,step(instucciones),
      //ingredients y equipment
      type: DataTypes.ARRAY,
      allowNull: true,
    },
  });
};
