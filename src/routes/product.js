const express = require('express');
const path = require('path')
const productsController = require('../controllers/productsController');
const router = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images/productImages');
    },
    filename: function(req, file, cb){
        let filename = `${file.fieldname}_img_${Date.now()}${path.extname(file.originalname)}`
        cb(null, filename);
    }
});

const uploadFile = multer({storage: storage});

router.get('/:product_name/detalle', productsController.showDetail)

router.get('/crear', productsController.showCreateProduct);
router.post('/crear', uploadFile.single('imagenes-colores'), productsController.processCreateProduct);

router.get('/editar', productsController.showEditProduct);
// router.post('/editar', productsController);

router.get('/lista', productsController.showMainList);

module.exports = router;