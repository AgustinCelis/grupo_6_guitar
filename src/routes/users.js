const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const multer = require('multer')

router.get('/user/login', usersController.login)
router.get('/user/register', usersController.register);

module.exports = router;