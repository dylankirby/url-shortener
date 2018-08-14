const assert = require('assert');
const needle = require('needle');

const mongoose = require('mongoose');
const User = require('../models/User');

const baseUrl = 'http://localhost:3000';
const data = { url: 'www.google.com', shortHash: '3Yq' };
const userProps = { name: 'Dylan', email: "dylan.kirby0128@gmail.com" };

const fakeKey = 'sfsa43853wrweajfklsdgag48923239r8aklsfjsdf'

describe('Developers Routes', () => {
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

	xit('Can update information on a developer account', (done) => {
		needle.post(`${baseUrl}/dev/user`, userProps);

		let newUserProps = {name: 'Dillon', email:'dylan0128@gmail.com'}

		needle.put(`${baseUrl}/dev/user/update`, newUserProps, (err, res) => {
			if(err){
				console.log(err)
			} else {
				let { user } = res.body
				assert(user.name == newUserProps.name)
				assert(user.email == newUserProps.email)
				done();
			}
		});
	});
});

describe('Developer access to API routes', (done) =>{
	xit('Cannot make an unauthorized call to the API', (done) => {
		needle.post(`${base_url}/api/shorten`, {API_KEY: fakeKey, url: data.url}, (err, res) => {
			if(err){
				console.log(err)
			} else {
				assert(res.status == 401);
				assert(res.body.url == null);
			}
		});
	});

	xit('Can make an authorized call to the API', (done) =>{
		needle.post(`${base_url}/api/shorten`, {API_KEY: process.env.API_KEY, url: data.url}, (err, res) => {
			if(err){
				console.log(err)
			} else {
				assert(res.status == 200);
				assert(res.body.url == data.shortHash);
			}
		});		
	});
});