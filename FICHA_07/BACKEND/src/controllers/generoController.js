
var Genero = require("../model/Genero");
var sequelize = require("../model/database");
const controllers = {};
sequelize.sync();

controllers.list = async (req, res) => {
  const data = await Genero.findAll()
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data });
};

/* REGISTAR ---------------------- */
controllers.create = async (req, res) => {
  const { descricao } = req.body;
  const data = await Genero.create({
    descricao: descricao,
  })
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      console.log("Erro: " + error);
      return error;
    });

  res.status(200).json({
    success: true,
    message: "Genero criado",
    data: data,
  });
};
//get genero
controllers.get = async (req, res) => {
  const { id } = req.params;
  const data = await Genero.findAll({
    where: { id: id },
  })
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data });
};

/* EDITAR --------------------------------------------------- */
controllers.update = async (req, res) => {
  // parameter get id
  const { id } = req.params;
  // parameter POST
  const { descricao } = req.body;
  // Update data
  const data = await Genero.update(
    {
      descricao: descricao,
    },
    {
      where: { id: id },
    }
  )
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data, message: "Updated Genero successful" });
};

//apagar

controllers.delete = async (req, res) => {
  // parâmetros por post
  const { id } = req.body;
  // delete por sequelize
  const data = await Genero.destroy({
    where: { id: id },
  })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, deleted: del, message: "Deleted Genero successful" });
};

module.exports = controllers;
