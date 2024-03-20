var Sequelize = require("sequelize");
var sequelize = require("./database");
// importa o modelo – chave forasteira roleID
var Genero = require("./Genero");
var Filmes = sequelize.define(
  "filmes",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: Sequelize.STRING,
    descricao: Sequelize.STRING,
    foto: Sequelize.STRING,
    generoId: {
      type: Sequelize.INTEGER,
      // referência a outro modelo
      references: {
        model: Genero,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);
Filmes.belongsTo(Genero);
module.exports = Filmes;