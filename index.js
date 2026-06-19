const express = require('express')
const router = require('./routes/url')
const { connectDB } = require('./connection')
const app = express()
const port = 8080
const urlRouter = router

// Connecting the database
connectDB('mongodb://127.0.0.1:27017/url-shortner-project')
.then(() => {
    console.log("MongoDB connected...");
})
.catch((err) => {
    console.log("Error in connection: ", err);
})

app.use(express.json())
app.use('/urlShortner', urlRouter)

app.listen(port, () => {
    console.log("Server started at port: ", port);
})