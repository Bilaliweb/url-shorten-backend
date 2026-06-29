const express = require('express')
const { connectDB } = require('./connection')
const path = require('path')
const URL = require('./models/url')
const app = express()
const port = 8080
const urlRouter = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user')
const cookieParser = require('cookie-parser')
const { restrictToLoggedInUserOnly, checkAuth, checkForAuthentication, restrictTo } = require('./middlewares/auth')

// Connecting the database
connectDB('mongodb://127.0.0.1:27017/url-shortner-project')
.then(() => {
    console.log("MongoDB connected...");
})
.catch((err) => {
    console.log("Error in connection: ", err);
})

/**
 * For SSR, we have to utilise templating engine.
 * In our case, we are using 'EJS'.
 */

// Setting up templating engine
app.set('view engine', 'ejs')

// Setting up the path from where views can be fetched. i.e; 'views' folder
app.set('views', path.resolve('./views'))

// For data coming in JSON
app.use(express.json())

// For data coming in Forms
app.use(express.urlencoded({ extended: false }))

// For cookies
app.use(cookieParser())

/**
 * This auth function needs on every request so put it in app.use()
 
Without Brackets:
 * This function is written without brackets cuz we are passing the function itself as a reference to Express, rather than executing it immediately.
 * When you pass just the function name, you are telling Express:
 "Here is the blueprint for my middleware. Do not run it right now. Hold onto it, and execute it automatically whenever a new HTTP request hits the server."
 
 * Express takes that reference and behind the scenes, every time a request arrives, it calls your function and supplies the arguments: checkForAuthentication(req, res, next).
 
With Brackets:
 * If you add brackets, JavaScript will execute your function immediately the exact millisecond your Node.js server boots up.Your function will run once, return undefined (because there is no return value at the end of the function body), and your code will effectively turn into:
 * app.use(undefined) // This crashes your server instantly!
 */
app.use(checkForAuthentication)

// Routes for supporting SSR (Server Side Rendering)
app.use('/', staticRoute)
// Routes for handling logic for URL shortening
app.use('/urlShortner', restrictTo(['NORMAL', 'ADMIN']), urlRouter)
// Routes for handling User Signup and Loginh
app.use('/user', userRoute)

// Listening to the port
app.listen(port, () => {
    console.log("Server started at port: ", port);
})