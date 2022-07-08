const userDB = require('../JSON/users.json')

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    let userInCookie = req.cookies.userName;
    let userFromCookie = userDB.find(user => {
        if (user.username == userInCookie) {
            return user;
        } else if (user.email == userInCookie) {
            return user;
        };
    });

    if(userFromCookie){
        delete userFromCookie.password
        req.session.userLogged = userFromCookie;
    }

    console.log(userFromCookie);

    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged
    };

    next();
};

module.exports = userLoggedMiddleware;