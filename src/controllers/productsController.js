const actions = require('../database/actions');
const path = require('path');
let products = require('../database/JSON/products.json');
const {
    param
} = require('../routes/product');

const controller = {
    showCreateProduct: function (req, res) {
        res.status(200).render('products/create');
    },
    showEditProduct: function (req, res) {
        res.status(200).render('products/edit');
    },
    showDetail: function (req, res) {
        let producto = products.filter(product => {
            if (product.product_name.toLowerCase() == req.params.product_name.toLowerCase()) {
                return product;
            }
        });
        if(producto.length > 0){
            res.status(200).render('products/detail', {producto: producto})
        }else{
            res.status(404).render('error404')
        }
    },
    showMainList: function (req, res) {
        res.status(200).render('products/mainList');
    }
};

module.exports = controller;