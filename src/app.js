const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');

const app = express();

//MIDDLEWARES PROPIOS
const userLoggedMiddleware = require('./database/middlewares/userLoggedMiddleware');

// RUTAS
const rutaHome = require('./routes/home');
const rutaProduct = require('./routes/products');
const rutaCart = require('./routes/cart');
const rutaUsers = require('./routes/users');

// MIDDLEWARES
app.use(session({
    secret: 'guitarWebSecret',
    resave: false,
    saveUninitialized: false,
}));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(methodOverride('_method'));

app.use(cookies());

//MIDDLEWARES PROPIOS
app.use(userLoggedMiddleware);

// RUTEO
app.listen(process.env.PORT || 4000, () =>{
    console.log('Server on port 4000');
});

app.use('/', rutaHome);

app.use('/', rutaProduct);

app.use('/', rutaCart);

app.use('/', rutaUsers);

app.use((req, res, next)=>{
    res.status(404).render('error404');
});