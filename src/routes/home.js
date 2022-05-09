const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.status(200).render('home');
});

router.get('/home', (req, res)=>{
    res.redirect('/');
});

module.exports = router;