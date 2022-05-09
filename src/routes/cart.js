const express = require('express');
const router = express.Router();

router.get('/carrito', (req, res) =>{
    res.status(200).render('cart')
})

module.exports = router;