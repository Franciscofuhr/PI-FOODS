const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "diets",
    {
      id: {
        type: DataTypes.UUID,
        defaulValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      names: {
        type: DataTypes.ARRAY({ type: DataTypes.TEXT }),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
