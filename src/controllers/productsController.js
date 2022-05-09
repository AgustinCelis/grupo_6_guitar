const controller = {
    mostrarCreate: function(req, res){
        res.status(200).render('products/create')
    },
    mostrarEdit: function(req, res){
        res.status(200).render('products/edit')
    }
}

module.exports = controller;