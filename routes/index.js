const express = require('express');
const path = require('path');

const router  = express.Router();

const b58 = require('../middlewares/base_58');
const cleaner = require('../middlewares/clean_url');

const Url = require('../models/Url');
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
	User.findById(req.body.API_KEY, (err, doc) => {
		if(doc){
			return next()
		} else {
			res.status(401).send("Not Authorized");
		}
	})
}

//Get route, returns FE assets
router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../views/index.html'));
});

//Takes in long form of url, posts to DB, and returns shortened url
router.post('/api/shorten', authMiddleware ,(req, res) => {
	let { url } = req.body;

	url = cleaner.clean(url);

	Url.findOne({url: url}, (err, foundUrl) => {
		if(foundUrl){
			//already exists
			res.status(200).send({url: foundUrl.shortenedHash, count: foundUrl.count});
		} else { 			//create new entry
			//get count
			Url.count({}, (err, count) => {
				const shortened = b58.encode(count+10000);

				const newUrl = new URL({
					url: url,
					shortenedHash: shortened
				});

				newUrl.save((err, newEntry) => {
					if(err){
						console.log(err);
					} else {
						return res.status(200).send({url: newUrl.shortenedHash, count: 0});
					}
				})
			});
		}
	})
});

// will handing incoming url redirects
router.get('/:incoming_url_hash', (req, res) => {
	Url.findOne({shortenedHash: req.params.incoming_url_hash}, (err, foundEntry) => {
		if(foundEntry) {
			res.redirect(`https://${foundEntry.url}`);
			Url.findOneAndUpdate({_id: foundEntry._id}, {$inc:{count: 1}}, (err, doc)=> {
				if(err){
					console.log(err);
				}
			})
		} else {
			res.sendFile(path.join(__dirname, '../views/404.html'));
		}
	})
});


module.exports = router;