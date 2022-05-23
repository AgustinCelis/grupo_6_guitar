const actions = require('../database/actions');

const controller = {
    login: function(req, res){
        res.status(200).render('users/login');
    },
    register: function(req, res){
        res.status(200).render('users/register');
    }
}

module.exports = controller;