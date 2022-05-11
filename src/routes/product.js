const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/detalle', productsController.showDetail);
router.get('/crear', productsController.showCreateProduct);
router.get('/editar', productsController.showEditProduct);
router.get('/lista', productsController.showMainList);

module.exports = router;