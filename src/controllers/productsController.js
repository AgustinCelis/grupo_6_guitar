const path = require('path');
const fs = require('fs')
var products = require('../database/JSON/products.json');
const { json } = require('express/lib/response');
const pathToDatabaseProducts = path.join(__dirname, '../database/JSON/products.json')

const controller = {
    showCreateProduct: function (req, res) {
        return res.status(200).render('products/create');
    },
    processCreateProduct: function(req, res){
        let body = req.body;
        let jsonData = JSON.parse(fs.readFileSync(pathToDatabaseProducts, 'utf8'));
        let id = 0;
        if(jsonData.length > 0){    
            id = jsonData.length + 1;
        }
        let objetoACrear = {id, ...body}
        jsonData.push(objetoACrear);
        fs.writeFileSync(pathToDatabaseProducts, JSON.stringify(jsonData));
        res.send(jsonData);
    },
    showEditProduct: function (req, res) {
        return res.status(200).render('products/edit');
    },
    processEditProduct: function(req, res){

    },
    showDetail: function (req, res) {
        let producto = products.find(product => {
            if (product.id == req.params.id) {
                return product;
            }
        });
        if(producto == undefined){
            return res.status(404).render('error404');
        }else{
            return res.status(200).render('products/detail', {producto});
        }
    },
    showMainList: function (req, res) {
        return res.status(200).render('products/mainList', {products});
    },
    showListAdmin: function(req, res){
        res.status(200).render('products/listAdmin', {products});
    }
};

module.exports = controller;