const express = require('express');
const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.listen(4000, () =>{
    console.log('Server on port 4000')
})

app.get('/', (req, res) =>{
    res.status(200).sendFile(path.join(__dirname, 'views/home.html'))
})