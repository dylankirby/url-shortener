const express = require('express');
const path = require('path');

const router  = express.Router();
//Routes

//Get route, returns FE assets
router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../views/index.html'));
});

//Takes in long form of url, posts to DB, and returns shortened url
router.post('/api/shorten', (req, res) => {
	// console.log('ping');
	res.send(req.body.url);
});

router.post('/api/return', (req, res) => {
	res.send(req.body.url);
});

router.get('/:incoming_url', (req, res) => {
	// will handing incoming url redirects
});


module.exports = router;