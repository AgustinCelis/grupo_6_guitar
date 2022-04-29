const express = require('express');
const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.listen(4000, () =>{
    console.log('Server on port 4000')
})

app.get('/', (req, res) =>{
    res.render('home.ejs');
})

app.get('/detalle', (req, res) =>{
    res.render('detail.ejs')
})

app.get('/carrito', (req, res) =>{
    res.render('cart.ejs')
})

app.get('/login', (req, res) =>{
    res.status(200).sendFile(path.join(__dirname, 'views/login.html'))
})

app.get('/register', (req, res) =>{
    res.status(200).sendFile(path.join(__dirname, 'views/register.html'))
})