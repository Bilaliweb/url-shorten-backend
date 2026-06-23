const express = require('express');
const URL = require('../models/url');

const router = express.Router();

router.get('/', async (req, res) => {
    const allUrls = await URL.find({})

    /**
     * Render function is used for rendering the views
     * EJS will render mentioned/desired view first on server and then will return final output for front end view
     * Parameters can also be passed as options when to render dynamic data
     *  */ 
    return res.render('home', {
        urls: allUrls
    })
})

module.exports = router;