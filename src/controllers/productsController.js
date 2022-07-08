const path = require('path');
const fs = require('fs')
const { json } = require('express/lib/response');
const { body } = require('express-validator');

// RUTA A BASE DE DATOS
const pathToDatabaseProducts = path.join(__dirname, '../database/JSON/products.json')

const controller = {
    // VISTA DE CREACION DE PRODUCTO
    showCreateProduct: function (req, res) {
        return res.status(200).render('products/create');
    },
    // CREACION DE PRODUCTOS
    processCreateProduct: function(req, res){
        let body = req.body;
        let productsDB = JSON.parse(fs.readFileSync(pathToDatabaseProducts, 'utf8'));
        // APLICACION DE ID
        let id = 1;
        if(productsDB.length > 0){
            let maxId = []  
            productsDB.forEach(element =>{
                return maxId.push(element.id)
            });
            id = Math.max(...maxId) + 1;
        };
        //CREACION DEL PRODUCTO
        let objetoACrear = {id, ...body};
        productsDB.push(objetoACrear);
        fs.writeFileSync(pathToDatabaseProducts, JSON.stringify(productsDB));
        res.redirect('/');
    },
    // VISTA DE EDICION DE PRODUCTOS
    showEditProduct: function (req, res) {
        let jsonData = JSON.parse(fs.readFileSync(pathToDatabaseProducts), 'utf8');

        // BUSQUEDA DE PRODUCTO A EDITAR 
        let product = jsonData.find(product => product.id == req.params.id);

        if(product == undefined){
            return res.send(`El producto con id ${req.params.id} no existe`)
        }
        return res.status(200).render('products/edit', {product});
    },
    // EDICION DE PRODUCTOS
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
    // VISTA DE DETALLE DE PRODUCTOS
    showDetail: function (req, res) {
        let jsonData = JSON.parse(fs.readFileSync(pathToDatabaseProducts), 'utf8');

        let product = jsonData.find(product => product.id == req.params.id);

        product != undefined ? res.status(400).render('products/detail', {product, user: req.session.userLogged}) : res.status(404).render('error404') 
    },
    // VISTA DE LISTADO DE PRODUCTOS
    showMainList: function (req, res) {
        return res.status(200).render('products/mainList', {products});
    },
    // VISTA DE ELIMINACION DE PRODUCTOS
    showDeleteProduct: function(req, res){
        let idProduct = req.params.id;
        let jsonData = JSON.parse(fs.readFileSync(pathToDatabaseProducts), 'utf8');
        res.render('products/delete', {
            idProduct,
            jsonData
        });
    },
    // SUPRESION DE PRODUCTOS
    processDelete: function(req, res){
        let jsonData = JSON.parse(fs.readFileSync(pathToDatabaseProducts), 'utf8');

        jsonData = jsonData.filter(dato => dato.id != req.params.id);

        fs.writeFileSync(pathToDatabaseProducts, JSON.stringify(jsonData)); 
        
        res.redirect('/')
    },
};

module.exports = controller;