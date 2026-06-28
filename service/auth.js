/**
 * Problem with this Map:
 * Whenever the server is started, this map will be empty and we have to login again.
 * Will be solving in next PR
 * 
 * This will behave as state and will be known as statefull authentication
 */
const sessionIDForUser = new Map()

function setSessionForUser(id, user) {
    return sessionIDForUser.set(id, user)
}

function getSessionForUser(id) {
    return sessionIDForUser.get(id)
}

module.exports = {
    setSessionForUser,
    getSessionForUser
}