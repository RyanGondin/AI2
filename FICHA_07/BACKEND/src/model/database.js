var Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "ai2", //nome
  "postgres", //user
  "delta001", //pass
  {
    host: "localhost",
    port: "5432",
    dialect: "postgres",
  }
);

sequelize.sync();

module.exports = sequelize;
