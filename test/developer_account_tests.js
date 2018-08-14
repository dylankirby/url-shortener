const assert = require('assert');
const needle = require('needle');

const mongoose = require('mongoose');
const User = require('../models/User');

const baseUrl = 'http://localhost:3000';
const userProps = { name: 'Dylan', email: "dylan.kirby0128@gmail.com" };



describe('Developers Account Routes', () => {
	before((done) => {
		mongoose.connect('mongodb://localhost:27017/url_shortner');
		mongoose.connection
			.once('open', () => done())
			.on('error', (error) => {
				console.warn('Connection Error: ', error);
			});
	});

	beforeEach((done) => {
		const { users } = mongoose.connection.collections;
		users.drop()
			.then(() => done())
			.catch(() => done());
	});


	it('Can create a new developer account', (done) => {
		//post to route to create a new dev account
		needle.post(`${baseUrl}/dev/user`, userProps, (err, res) =>{
			if(err){
				console.log(err);
			} else {
				User.findById(res.body.user._id, (err, doc) => { //find the user in the database
					if(err){
						console.log(err);
					} else {
						assert(doc.name == userProps.name) //check name match
						assert(doc.email == userProps.email) //check email match
						assert(doc._id) //assert that the returned API key is the same as the one in the file
						done();
					}
				});
			}
		});
	});

	it('Can get user information given an email', (done) => {
		needle.post(`${baseUrl}/dev/user`, userProps, (err, res) => {
			needle.get(`${baseUrl}/dev/user/${userProps.email}`, (err, res) => {
				if(err){
					console.log(err)
				} else {
					assert(res.body.user.name == userProps.name);
					done();
				}
			});
		});
	});

	it('Can update information on a developer account', (done) => {
		needle.post(`${baseUrl}/dev/user`, userProps, (err, res) => {
			if(res.body) {
				let newUserProps = {name: 'Dillon', email:'dylan0128@gmail.com'}

				needle.put(`${baseUrl}/dev/user/${res.body.user._id}`, newUserProps, (err, res) => {
					if(err){
						console.log(err)
					} else {
						let updatedUser = res.body.user
						assert(updatedUser.name == newUserProps.name)
						assert(updatedUser.email == newUserProps.email)
						done();
					}
				});
			}
		});
	});

	it('Can delete a new developer account', (done)=> {
		//create a new dev account
		needle.post(`${baseUrl}/dev/user`, userProps, (err, res) => {
			let { user } = res.body;
			needle.delete(`${baseUrl}/dev/user/${user._id}`, null, (err, res) => {
				User.findById(user._id, (err, doc) => {
					if(err){
						console.log(err)
					} else {
						assert(!doc);
						done();
					}
				});
			});

		});
	});
});
