const User = require("../models/user")
const {v4: uuidV4} = require('uuid')
const { setSessionForUser } = require("../service/auth")
const { setUser } = require("../service/jwtAuth")

async function handleUserSignUp(req, res) {
    const { name, email, password, role } = req.body 

    await User.create({
        name,
        email,
        password,
        role
    })

    return res.redirect('/')
}

async function handleUserLogIn(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({
        email,
        password
    }).lean();

    if(!user) {
        return res.render('login', {
            error: 'Invalid email or password'
        })
    }

    /**
     * For storing a unique id against logged in user
     * i.e;
       const generatedSessionID = uuidV4();
       setSessionForUser(generatedSessionID, user)
       res.cookie('uid', generatedSessionID)
    */
    
    // Using JWT
    const token = setUser(user)

    // Setting up a cookie in response for further validation
    // res.cookie('userToken', token)
    
    /**
     * For sending token as json so it can be can be extracted from request headers 
     * and can be used for further validation if request is from client other than Web Browser i.e; Mobile app
    */

   res.cookie('userToken', token)
   
   return res.redirect('/')
   // return res.json({ token })
}

module.exports = {
    handleUserSignUp,
    handleUserLogIn
}