const express = require('express');
const path = require('path');

const router  = express.Router();

const b58 = require('../middlewares/base_58');
const cleaner = require('../middlewares/clean_url');

const URL = require('../models/Url');

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
	let { url } = req.body;

	url = cleaner.clean(url);

	URL.findOne({url: url}, (err, foundUrl) => {
		if(foundUrl){
			//already exists
			res.send({url: foundUrl.shortenedHash});
		} else { 			//create new entry
			//get count
			URL.count({}, (err, count) => {
				const shortened = b58.encode(count+10000);

				const newUrl = new URL({
					url: url,
					shortenedHash: shortened
				});

				newUrl.save((err, newEntry) => {
					if(err){
						console.log(err);
					} else {
						return res.status(200).send({url: newUrl.shortenedHash});
					}
				})
			});
		}
	})
});

// will handing incoming url redirects
router.get('/:incoming_url_hash', (req, res) => {
	const { incoming_url_hash } = req.params;

	URL.findOne({shortenedHash: incoming_url_hash}, (err, foundEntry) => {
		if(foundEntry) {
			res.redirect(`https://${foundEntry.url}`);
		} else {
			res.status(404).send("404 - URL Not Found");
		}
	})
});


module.exports = router;