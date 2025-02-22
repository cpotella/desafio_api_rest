const express = require("express");
const { obtenerJoyas, obtenerJoyasPorFiltro } = require('../controllers/joyasController');


const router = express.Router();

router.get("/joyas", obtenerJoyas);

router.get("/joyas/filtros", obtenerJoyasPorFiltro);

module.exports = router;
