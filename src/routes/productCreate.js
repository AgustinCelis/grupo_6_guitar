const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/crear', productsController.mostrarCreate);

module.exports = router;