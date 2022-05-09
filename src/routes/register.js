const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const multer = require('multer')

router.get('/register', usersController.register);

module.exports = router;