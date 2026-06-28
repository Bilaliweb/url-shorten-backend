const { getSessionForUser } = require("../service/auth");
const { getUser } = require("../service/jwtAuth");

function restrictToLoggedInUserOnly (req, res, next) {

    /**
     * Using statefull authentication way using simple map set
     const cookieId = req.cookies?.uid
     if(!cookieId) return res.redirect('/login')

     // User coming from session map set we created to store session id along with related user
     const user = getSessionForUser(cookieId)
     
     if(!user) return res.redirect('/login')
    
     // Adding a user object in request so actual function can utilise for further logic handling
     req.user = user

     console.log("Request after setting user: ", req.user);

     next()

     */

    const userToken = req.cookies?.userToken
    if(!userToken) return res.redirect('/login')

    // User get from jwt
    const user = getUser(userToken)

    if(!user) return res.redirect('/login')

    // Adding a user object in request so actual function can utilise for further logic handling
    req.user = user

    next()
}

async function checkAuth (req, res, next) {    
    // Add req.path to your log statement to see what route is being checked
    console.log("Checking route:", req.path); 
    
    /**
     * Using statefull authentication way using simple map set.
     * 
      const cookieId = req.cookies?.uid
      if(!cookieId) return res.redirect('/login')
      User coming from session map set we created to store session id along with related user
      const user = getSessionForUser(cookieId)
      console.log("User in check auth: ", user);
    */

    // Using stateless authentication way using JWT
    const user = getUser(req.cookies?.userToken)

    // if(!user) return res.redirect('/login')

    // Adding a user object in request so actual function can utilise for further logic handling
    req.user = user

    next()
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth
}