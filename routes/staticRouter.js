const express = require('express');
const URL = require('../models/url');

const router = express.Router();

router.get('/', async (req, res) => {
    if(!req.user) return res.redirect('/login');

    // Get URLs for specific user (Logged in user)
    const allUrls = await URL.find({
        createdBy: req.user._id
    })

    /**
     * Render function is used for rendering the views
     * EJS will render mentioned/desired view first on server and then will return final output for front end view
     * Parameters can also be passed as options when to render dynamic data
     *  */ 
    return res.render('home', {
        urls: allUrls
    })
})

// For User Sign up
router.get('/signup', (req, res) => {
    return res.render('signup')
})

// For Login
router.get('/login', (req, res) => {
    return res.render('login')
})

module.exports = router;