const path = require('path');
const fs = require('fs')
var products = require('../database/JSON/products.json');
const { json } = require('express/lib/response');
const { body } = require('express-validator');
const pathToDatabaseProducts = path.join(__dirname, '../database/JSON/products.json')

const controller = {
    showCreateProduct: function (req, res) {
        return res.status(200).render('products/create');
    },
    processCreateProduct: function(req, res){
        let body = req.body;
        let jsonData = JSON.parse(fs.readFileSync(pathToDatabaseProducts, 'utf8'));
        let id = 1;
        if(jsonData.length > 0){
            let maxId = []  
            jsonData.forEach(element =>{
                return maxId.push(element.id)
            });
            id = Math.max(...maxId) + 1;
        };
        let objetoACrear = {id, ...body};
        jsonData.push(objetoACrear);
        fs.writeFileSync(pathToDatabaseProducts, JSON.stringify(jsonData));
        res.redirect('/');
    },
    showEditProduct: function (req, res) {
        const jsonData = JSON.parse(fs.readFileSync(pathToDatabaseProducts), 'utf8');

        let product = jsonData.find(product => product.id == req.params.id);

        return res.status(200).render('products/edit', {product});
    },
    processEditProduct: function(req, res){
        let body = req.body;
        let jsonData = JSON.parse(fs.readFileSync(pathToDatabaseProducts, 'utf8'));

        let productToEdit = jsonData.find(product => product.id == req.params.id);
        
        let productId = req.params.id;
        let id = parseInt(productId);

        productToEdit = {id, ...body};

        jsonData = jsonData.filter(dato => dato.id != req.params.id);
        
        jsonData.push(productToEdit);

        fs.writeFileSync(pathToDatabaseProducts, JSON.stringify(jsonData));
        res.redirect('/')
    },
    showDetail: function (req, res) {
        let producto = products.find(product => {
            if (product.id == req.params.id) {
                return product;
            }
        });
        producto != undefined ? res.status(400).render('products/detail', {producto}) : res.status(404).render('error404') 
    },
    showMainList: function (req, res) {
        return res.status(200).render('products/mainList', {products});
    },
    showListAdmin: function(req, res){
        res.status(200).render('products/listAdmin', {products});
    },
    showDeleteProduct: function(req, res){
        let idProduct = req.params.id;
        let jsonData = JSON.parse(fs.readFileSync(pathToDatabaseProducts), 'utf8');
        res.render('products/delete', {
            idProduct,
            jsonData
        });
    },
    processDelete: function(req, res){
        let jsonData = JSON.parse(fs.readFileSync(pathToDatabaseProducts), 'utf8');

        jsonData = jsonData.filter(dato => dato.id != req.params.id);

        fs.writeFileSync(pathToDatabaseProducts, JSON.stringify(jsonData)); 
        
        res.redirect('/')
    },
};

module.exports = controller;