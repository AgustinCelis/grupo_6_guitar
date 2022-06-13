const express = require('express');
const router = express.Router();

router.get('/cart', (req, res) =>{
    res.status(200).render('cart')
})

module.exports = router;