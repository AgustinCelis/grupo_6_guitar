const express = require('express');
const router = express.Router();

router.get('/detalle', (req, res) =>{
    res.status(200).render('detail')
})

module.exports = router;