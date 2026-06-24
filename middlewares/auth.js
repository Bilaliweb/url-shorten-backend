const { getSessionForUser } = require("../service/auth")

function restrictToLoggedInUserOnly (req, res, next) {
    console.log("Request: ", req);
    const cookieId = req.cookies?.uid

    if(!cookieId) return res.redirect('/login')

    // User coming from session map set we created to store session id along with related user
    const user = getSessionForUser(cookieId)
    console.log("User: ", user);
    

    if(!user) return res.redirect('/login')

    // Adding a user object in request so actual function can utilise for further logic handling
    req.user = user

    console.log("Request after setting user: ", req.user);

    next()
}

async function checkAuth (req, res, next) {
    const cookieId = req.cookies?.uid

    // if(!cookieId) return res.redirect('/login')

    // User coming from session map set we created to store session id along with related user
    const user = getSessionForUser(cookieId)
    console.log("User in check auth: ", user);
    

    // if(!user) return res.redirect('/login')

    // Adding a user object in request so actual function can utilise for further logic handling
    req.user = user

    console.log("Request after setting user in check auth: ", req.user);

    next()
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth
}