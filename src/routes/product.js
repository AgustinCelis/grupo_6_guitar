const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '../../public/productImages');
    },
    filename: function(req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}`);
    }
});

const upload = multer({storage: storage});

router.get('/:product_name/detalle', productsController.showDetail)

router.get('/crear', productsController.showCreateProduct);
// router.post('/crear', upload.any(), productsController);

router.get('/editar', productsController.showEditProduct);
// router.post('/editar', productsController);

router.get('/lista', productsController.showMainList);

module.exports = router;