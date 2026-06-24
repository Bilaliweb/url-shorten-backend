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
const { restrictToLoggedInUserOnly, checkAuth } = require('./middlewares/auth')

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

app.use('/', checkAuth, staticRoute)
app.use('/urlShortner', restrictToLoggedInUserOnly, urlRouter)
app.use('/user', userRoute)

app.listen(port, () => {
    console.log("Server started at port: ", port);
})