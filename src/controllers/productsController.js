const actions = require('../database/actions');
const path = require('path');
const fs = require('fs')
let products = require('../database/JSON/products.json');

const controller = {
    showCreateProduct: function (req, res) {
        return res.status(200).render('products/create');
    },
    processCreateProduct: function(req, res){
        return res.send(req.body);
    },
    showEditProduct: function (req, res) {
        return res.status(200).render('products/edit');
    },
    showDetail: function (req, res) {
        let producto = products.filter(product => {
            if (product.product_name.toLowerCase() == req.params.product_name.toLowerCase()) {
                return product;
            }
        });
        if(producto.length > 0){
            return res.status(200).render('products/detail', {producto: producto})
        }else{
            return res.status(404).render('error404')
        }
    },
    showMainList: function (req, res) {
        return res.status(200).render('products/mainList');
    },
};

module.exports = controller;