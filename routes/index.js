const express = require('express');
const path = require('path');

const router  = express.Router();

const shorten = require('../middlewares/shorten');
const Url = require('../models/Url');

//Get route, returns FE assets
router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../views/index.html'));
});

//Simply returns the url given to it, done for testing purposes
router.post('/api/return', (req, res) => {
	res.send({url: req.body.url});
});

//Takes in long form of url, posts to DB, and returns shortened url
router.post('/api/shorten', (req, res) => {
	console.log('ping');
});

// will handing incoming url redirects
router.get('/:incoming_url', (req, res) => {

});


module.exports = router;