const express = require('express');
const path = require('path');
const router = express.Router();
const usersController = require('../controllers/usersController');
const multer = require('multer');
const {body} = require('express-validator');

const guestMiddleware = require('../database/middlewares/guestMiddleware.js');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images/users'));
    },
    filename: function (req, file, cb) {
        let filename = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, filename);
    },
});

const uploadFile = multer({storage});

const validations = [
    body('username').notEmpty().withMessage('Tiener que escribir un nombre de usuario'),
    body('email')
    .notEmpty().withMessage('Tienes que escribir un correo electronico').bail()
    .isEmail().withMessage('Debes escribir un formato de correo valido'),
    body('password').notEmpty().withMessage('Tienes que escribir una contrasena'),
    body('confirm_password').notEmpty().withMessage('Tienes que confirmar la contrasena'),
    body('user_image').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else{
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Formato valido, solo se permite ${acceptedExtensions.join(', ')}`);
            };
        }
        return true;
    }),
    body('terminos').notEmpty().withMessage('Tienes que aceptar los terminos y condiciones')
]

// Login
router.get('/user/login', guestMiddleware, usersController.showLogin);
router.post('/user/login', usersController.processLogin);

// Register
router.get('/user/register', guestMiddleware, usersController.showRegister);
router.post('/user/register', uploadFile.single('user_image'), validations, usersController.processRegister);


// LOGOUT
router.get('/user/logout', usersController.logout);

module.exports = router;