/**
 * JWT will be used for stateless authentication.
 * Actual data will be stored in jwt token along with secret to avoid being hacked. 
 */

const jwt = require('jsonwebtoken')

// Hardcoded secret for now
const secret = 'secrettokenjwt@123'

// Setting up jwt
function setUser(user) {
    console.log("User jwt: ", typeof user);
    // Converting into simple plain object to avoid errors if not converted in query
    // const plainObject = user.toObject()
    // console.log("Plain object: ", typeof plainObject);
    
    return jwt.sign(user, secret)
    // return jwt.sign(plainObject, secret)
}

function getUser(token) {
    try {
        console.log("Verified...");
        return jwt.verify(token, secret)
    } 
    catch (error) {
        console.log("Not Verified...");
        
        return null
    }
}

module.exports = {
    setUser,
    getUser
}