const express = require('express');
const { handleShortUrl, getURLToRedirect, getAnalytics } = require('../controllers/url');
const router = express.Router();

router.post('/', handleShortUrl)
router.get('/:shortId', getURLToRedirect)
router.get('/analytics/:shortId', getAnalytics)

module.exports = router