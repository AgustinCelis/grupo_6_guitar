const express = require('express');
const path = require('path');
const productsController = require('../controllers/productsController');
const router = express.Router();
const multer = require('multer');
const { body } = require('express-validator');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/images/products'));
    },
    filename: function(req, file, cb){
        let filename = `${file.fieldname}_productimg_${Date.now()}${path.extname(file.originalname)}`
        cb(null, filename);
    },
});

const uploadFile = multer({storage: storage});

// Lista de guitarras
router.get('/products', productsController.showMainList);

// Creacion de productos
router.get('/products/create', productsController.showCreateProduct);
router.post('/products/create', uploadFile.any(), productsController.processCreateProduct);

// Edicion de productos
router.get('/products/edit/:id', productsController.showEditProduct);
router.put('/products/edit/:id', uploadFile.any(), productsController.processEditProduct);  

// Panel interactivo de admin 
router.get('/products/adminlist', productsController.showListAdmin);

// Detalle de producto
router.get('/products/detail/:id', productsController.showDetail);

// Eliminacion de productos
router.get('/products/delete/:id', productsController.showDeleteProduct);
router.delete('/products/delete/:id', productsController.processDelete);

module.exports = router;