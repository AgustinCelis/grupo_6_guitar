const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const pathToDatabaseUsers = path.join(__dirname, '../database/JSON/users.json');

const controller = {
    // VISTA DE LOGIN
    showLogin: function (req, res) {
        return res.status(200).render('users/login');
    },
    // PROCESAMIENTO DE LOGIN
    processLogin: function (req, res) {
        let userDB = JSON.parse(fs.readFileSync(pathToDatabaseUsers, 'utf8'));

        let userToLogin = userDB.find(user => {
            if((req.body.username).toLowerCase() == (user.email).toLowerCase()){
                return true;
            }else if((req.body.username).toLowerCase() == (user.username).toLowerCase()){
                return true;
            };
        });

        if (req.body.username == "") {
            return res.render('users/login', {
                errors: {
                    username: {
                        msg: 'Debes escribir un nombre de usuario o email'
                    }
                },
                oldData: req.body
            });
        } else if (req.body.password == "") {
            return res.render('users/login', {
                errors: {
                    password: {
                        msg: 'Debes escribir una contraseña'
                    }
                },
                oldData: req.body
            });
        };

        if (userToLogin) {
            let correctPassword = bcrypt.compareSync(req.body.password, userToLogin.password);
            if (correctPassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                if(req.body.remember_user) {
                    res.cookie('userName', req.body.username, {maxAge: 1000 * 60})
                };

                return res.redirect('/');
            };
            return res.render('users/login', {
                errors: {
                    password: {
                        msg: 'Credenciales invalidas'
                    }
                },
                oldData: req.body
            });
        };

        return res.render('users/login', {
            errors: {
                username: {
                    msg: "Este email no esta registrado"
                },
            }
        });
    },
    // VISTA DE REGISTER
    showRegister: function (req, res) {
        return res.status(200).render('users/register');
    },
    // PROCESAMIENTO DE REGISTER
    processRegister: function (req, res) {
        let userDB = JSON.parse(fs.readFileSync(pathToDatabaseUsers, 'utf8'));
        const resultValidation = validationResult(req);

        // BUSQUEDA DE USUARIO
        const emailInDb = userDB.find(user => user.email == req.body.email);
        const userInDb = userDB.find(user => user.username == req.body.username);

        // MANEJO DE ERRORES
        if (resultValidation.errors.length > 0) {
            return res.render('users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        };

        if (userInDb && emailInDb) {
            return res.render('users/register', {
                errors: {
                    username: {
                        msg: 'Este usuario ya existe'
                    },
                    email: {
                        msg: 'Este email ya existe'
                    },

                },
                oldData: req.body
            });
        } else if (userInDb) {
            return res.render('users/register', {
                errors: {
                    username: {
                        msg: 'Este usuario ya existe'
                    }
                },
                oldData: req.body
            });
        } else if (emailInDb) {
            return res.render('users/register', {
                errors: {
                    email: {
                        msg: 'Este email ya existe'
                    }
                },
                oldData: req.body
            });
        };

        if(req.body.password != req.body.confirm_password){
            return res.render('users/register', {
                errors: {
                    password: {
                        msg: 'Las contrasenas no coinciden'
                    },
                    confirm_password:{
                        msg: ""
                    }
                },
                oldData: req.body
            });
        };

        // CREACION DEL USUARIO
        let id = 1;
        if (userDB.length > 0) {
            let maxId = [];
            userDB.forEach(user => {
                maxId.push(user.id);
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


        req.session.userLogged = userToCreate;

        delete userToCreate.password;

        console.log(userToCreate);

        return res.redirect('/');
    },
    //LOGOUT
    logout: function(req, res){
        res.clearCookie('userName');
        req.session.destroy();
        return res.redirect('/');
    }
}

module.exports = controller;