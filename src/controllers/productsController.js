const actions = require('../database/actions')

const controller = {
    showCreateProduct: function(req, res){
        res.status(200).render('products/create');
    },
    showEditProduct: function(req, res){
        res.status(200).render('products/edit');
    },
    showDetail: function(req, res){
        res.status(200).render('products/detail');
    },
    showMainList: function(req, res){
        res.status(200).render('products/mainList');
    }
};

module.exports = controller;