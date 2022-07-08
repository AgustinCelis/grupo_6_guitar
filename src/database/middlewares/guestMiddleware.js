function guestMiddleware(req, res, next){
    if(req.session && req.session.userLogged){
        return res.redirect('/')
    };
    next();
};

module.exports = guestMiddleware;