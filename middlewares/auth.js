const { getSessionForUser } = require("../service/auth");
const { getUser } = require("../service/jwtAuth");

function checkForAuthentication(req, res, next) {
    /**
     * Check cookies first (standard for EJS/browsers), fallback to headers (Postman/APIs)
     * 
     * For demonstration how to utilise Bearer token from 'authorization' header
    
    const authorizationHeaderValue = req.headers['authorization']
    req.user = null;
    
    if(!authorizationHeaderValue || !authorizationHeaderValue?.startsWith('Bearer')) {
        return next()
    }
    const extractedToken = authorizationHeaderValue?.split("Bearer ")[1]
    */
    
    const tokenInCookie = req.cookies?.userToken

    req.user = null;

    if (!tokenInCookie) {
        return next()
    }

    // User get from jwt
    const user = getUser(tokenInCookie)

    // Adding a user object in request so actual function can utilise for further logic handling
    req.user = user

    return next()
}

function restrictTo(roles) {
    return function (req, res, next) {
        console.log("User roles: ", roles);
        console.log("Request user restrict: ", req.user.role);
        

        if (!req.user) {
            return res.redirect('/login')
        }

        // If user is logged in but not fullfiling the role
        if (!roles.includes(req.user.role)) {
            return res.end('UnAuthorised')
        }

        return next()
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo
}