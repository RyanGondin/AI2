var Filmes = require("../model/Filmes");
var Genero = require("../model/Genero");
var sequelize = require("../model/database");
const controllers = {};
sequelize.sync();

/*controllers.testdata = async (req, res) => {
  const response = await sequelize
    .sync()
    .then(function () {
      //APAGAR após a primeira EXECUÇÃO
      //Cria Role
      Genero.create({
        Desc_Genero: "action",
      });
      //Cria Filme
      Filmes.create({
        descricao: "descricao",
        titulo: "unchartes",
        foto: "foto",
        generoId: 1,
      });

      const data = Filmes.findAll();
      return data;
    })

    .catch((error) => {
      return error;
    });
  res.json(response);
};*/
//listar
controllers.list = async (req, res) => {
  const data = await Filmes.findAll({
    include: [Genero],
  })
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
  // data
  const { descricao, titulo, foto, generoId } = req.body;
  // create
  const data = await Filmes.create({
    titulo: titulo,
    descricao: descricao,
    foto: foto,
    generoId: generoId
  })
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      console.log("Erro: " + error);
      return error;
    });
  // return res
  res.status(200).json({
    success: true,
    message: "Filme Registado",
    data: data,
  });
};

controllers.get = async (req, res) => {
  const { id } = req.params;
  const data = await Filmes.findAll({
    where: { id: id },
    include: [Genero],
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
  const { titulo, descricao, foto, generoId } = req.body;
  // Update data
  const data = await Filmes.update(
    {
      titulo: titulo,
      descricao: descricao,
      foto: foto,
      generoId: generoId,
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
  res.json({ success: true, data: data, message: "Updated successful" });
};

//apagar

controllers.delete = async (req, res) => {
  // parâmetros por post
  const { id } = req.body;
  // delete por sequelize
  const data = await Filmes.destroy({
    where: { id: id },
  }).catch((error) => {
    return error;
  });
  res.json({ success: true, deleted: del, message: "Deleted successful" });
};

module.exports = controllers;
