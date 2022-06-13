const express = require('express');
const path = require('path');
const productsController = require('../controllers/productsController');
const router = express.Router();
const multer = require('multer');
const { body } = require('express-validator');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images/productImages');
    },
    filename: function(req, file, cb){
        let filename = `${file.fieldname}_img_${Date.now()}${path.extname(file.originalname)}`
        cb(null, filename);
    },
});

const uploadFile = multer({storage: storage});

router.get('/products', productsController.showMainList);

router.get('/products/create', productsController.showCreateProduct);
router.post('/products/create', uploadFile.any(), productsController.processCreateProduct);

router.get('/products/edit/:id', productsController.showEditProduct);
router.put('/products/edit/:id', productsController.processEditProduct);  

router.get('/products/adminlist', productsController.showListAdmin);

router.get('/products/detail/:id', productsController.showDetail);

router.get('/products/delete/:id', productsController.showDeleteProduct);
router.delete('/products/delete/:id', productsController.processDelete);

module.exports = router;