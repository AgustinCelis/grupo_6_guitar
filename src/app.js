const express = require('express');
const path = require('path');
const rutaHome = require('./routes/home');
const rutaProduct = require('./routes/product');
const rutaCart = require('./routes/cart');
const rutaUsers = require('./routes/users')

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, '../public')))

app.listen(4000, () =>{
    console.log('Server on port 4000');
});

app.use('/', rutaHome)

app.use('/producto', rutaProduct);

app.use('/', rutaCart);

app.use('/usuario', rutaUsers);

app.use((req, res, next)=>{
    res.status(404).send('not-found');
});