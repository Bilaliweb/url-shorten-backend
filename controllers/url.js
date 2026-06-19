const {nanoid} = require('nanoid')
const URL = require('../models/url')

async function handleShortUrl(req, res) {
    const body = req.body

    if(!body.url) return res.status(400).json({ msg: 'URL is required.' })

    if(!body.url.includes('http' || 'https')) return res.status(400).json({ msg: 'Enter valid url.' })

    const shortID = nanoid(8)

    // This will store the generated ID and that ID will be used to redirect to url user provided.
    // e.g;
    // url provided by user: https://abc.com and generated ID is abcxyz.
    // Now when our base url will be used with that id i.e; http://localhost:8080/abcxyz , this will redirect to 'abc.com'
    await URL.create({
        shortUrlId: shortID,
        redirectUrl: body.url,
        vistHistory: []
    })

    return res.status(201).json({ msg: 'success' })
}

async function getURLToRedirect(req, res) {
    const urlId = req.params.shortId

    const fetchedUrl = await URL.findOneAndUpdate(
        {
        shortUrlId: urlId
        },
        {
            $push: {
                vistHistory: {
                    timestamp: Date.now()
                }
            }
        }
    )

    return res.redirect(fetchedUrl.redirectUrl)
}

async function getAnalytics(req, res) {
    const shortId = req.params.shortId

    const fetchedUrlId = await URL.findOne({
        shortUrlId: shortId
    })

    return res.json({
        totalClicks: fetchedUrlId.vistHistory.length,
        analytics: fetchedUrlId.vistHistory
    })
}

module.exports = {
    handleShortUrl,
    getURLToRedirect,
    getAnalytics
}