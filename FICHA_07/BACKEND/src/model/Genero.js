var Sequelize = require("sequelize");
var sequelize = require("./database");
var Genero = sequelize.define(
  "genero",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descricao: Sequelize.STRING,
  },
  {
    timestamps: false,
  }
);
module.exports = Genero;