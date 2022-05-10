const express = require('express');
const path = require('path');
const rutaHome = require('./routes/home');
const rutaProduct = require('./routes/product');
const rutaCart = require('./routes/cart');
const rutaLogin = require('./routes/login');
const rutaRegister = require('./routes/register');

const app = express();

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.listen(4000, () =>{
    console.log('Server on port 4000');
});

app.use('/', rutaHome)

app.use('/producto', rutaProduct);

app.use('/', rutaCart);

app.use('/', rutaLogin);

app.use('/', rutaRegister);

app.use((req, res, next)=>{
    res.status(404).send('not-found');
});