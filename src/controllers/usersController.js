const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const {
    validationResult
} = require('express-validator');
const pathToDatabaseUsers = path.join(__dirname, '../database/JSON/users.json');

const controller = {
    showLogin: function (req, res) {
        res.status(200).render('users/login');
    },

    processLogin: function (req, res) {
        let userDB = JSON.parse(fs.readFileSync(pathToDatabaseUsers, 'utf8'));

        let userToLogin = userDB.find(user => (user.email.toLowerCase() || user.username.toLowerCase()) == (req.body.username).toLowerCase());
    },


    showRegister: function (req, res) {
        res.status(200).render('users/register');
    },
    processRegister: function (req, res) {
        let userDB = JSON.parse(fs.readFileSync(pathToDatabaseUsers, 'utf8'));
        const resultValidation = validationResult(req);

        const emailInDb = userDB.find(user => user.email == req.body.email);
        const userInDb = userDB.find(user => user.username == req.body.username);

        if (resultValidation.errors.length > 0) {
            return res.render('users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        };

        if(userInDb && emailInDb){
            return res.render('users/register',{
                errors: {
                    username:{
                        msg: 'Este usuario ya existe'
                    },
                    email:{
                        msg: 'Este email ya existe'
                    },

                },
                oldData: req.body
            });
        }else if(userInDb){
            return res.render('users/register',{
                errors:{
                    username:{
                        msg: 'Este usuario ya existe'
                    }
                },
                oldData: req.body
            })
        }else if(emailInDb){
            return res.render('users/register',{
                errors:{
                    email: {
                        msg: 'Este email ya existe'
                    }
                },
                oldData: req.body
            })
        };

        let id = 1;
        if (userDB.length > 0) {
            let maxId = []
            userDB.forEach(element => {
                maxId.push(element.id)
            });
            id = Math.max(...maxId) + 1;
        };

        let userToCreate = {
            id,
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            user_image: req.file.filename
        };

        userDB.push(userToCreate);
        fs.writeFileSync(pathToDatabaseUsers, JSON.stringify(userDB));
        return res.redirect('/')
    }
}

module.exports = controller;