const express = require('express');
const router = express.Router();

const generoController = require('../controllers/generoController');

router.post('/create', generoController.create);
router.get('/list', generoController.list);
router.put('/update/:id', generoController.update);
router.get('/get/:id', generoController.get);
router.put('/delete', generoController.delete);

module.exports = router;