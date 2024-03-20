const express = require("express");
const router = express.Router();
//importer os controladores [2]
const filmesController = require("../controllers/filmesController");
router.get("/list", filmesController.list);
router.post("/create", filmesController.create);
router.get("/get/:id", filmesController.get);
router.put("/update/:id", filmesController.update);
router.delete("/delete", filmesController.delete);
module.exports = router;
