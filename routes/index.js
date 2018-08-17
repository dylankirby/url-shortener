const express = require('express');
const path = require('path');
const cors = require('cors');

const router  = express.Router();

//middleware imports
const b58 = require('../middlewares/base_58');
const urlCleaner = require('../middlewares/clean_url');

//model imports
const Url = require('../models/Url');
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
	if(process.env.NODE_ENV == 'production'){
		if(req.headers.origin !== process.env.HEROKU_URL) {
			User.findById(req.body.API_KEY, (err, user) => {
				if(user){
					return next()
				} else {
					return res.status(401).send("Unauthorized");
				}
			})
		} else {
			return next()
		}
	} else {
		return next()
	}
}

//Get route, returns frontend
router.get('/', (req, res) => {
	res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

//Takes in long form of url, posts to DB, and returns shortened url
router.post('/api/shorten', authMiddleware, (req, res) => {
	let url = urlCleaner.clean(req.body.url) // cleans incoming url of protocol

	Url.findOne({ url: url }, (err, foundUrl) => { // try to find url in db if it already exists
		if(foundUrl){
			//already exists
			res.status(200).send({ url: foundUrl.shortenedHash, count: foundUrl.count });
		} else { 			//create new entry
			//get count
			Url.count({}, (err, count) => {
				const shortened = b58.encode(count+10000);

				const newUrl = new Url({
					url: url,
					shortenedHash: shortened
				});

				newUrl.save((err, newEntry) => {
					if(err){
						return res.status(500).send(err);
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
				if(err){ console.log(err) }
			});
		} else {
			res.status(200).sendFile(path.join(__dirname, '../views/404.html'));
		}
	})
});


module.exports = router;