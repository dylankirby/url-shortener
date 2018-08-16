const express = require('express');
const path = require('path');

const User = require('../models/User');

const router = express.Router();

router.get('/dev/user/:email', (req, res) => {
	User.findOne({email: req.params.email}, (err, user) => {
		if(err){
			return res.status(500).send(err)
		} else {
			return res.status(200).send({user});
		}
	})
});

router.post('/dev/user', (req,res) => {
	const { name, email } = req.body;
	const newUser = new User({ name, email });

	newUser.save((err, newUser) => {
		if(err){
			return res.status(500).send(err);
		} else {
			return res.status(200).send({user: newUser});
		}
	});
});

router.put('/dev/user/:userId', (req, res) => {
	User.findByIdAndUpdate(req.params.userId, 
		{
			$set: {
				name: req.body.name,
				email: req.body.email
			}
		}, 
		{new: true}, 
		(err, updatedUser) => {
			if(err){
				return res.status(500).send(err)
			} else {
				return res.status(200).send({user: updatedUser});
			}
		}
	)
});

router.delete('/dev/user/:userId', (req, res) => {
	User.findByIdAndRemove(req.params.userId, (err, deletedUser) => {
		if(err){
			return res.status(500).send(err)
		} else {
			return res.status(200).send({message: "Deletion Succesful"});
		}
	})
});


module.exports = router;