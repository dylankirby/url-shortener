const assert = require('assert');
const needle = require('needle');
const mongoose = require('mongoose');

const User = require('../models/User');

const baseUrl = 'http://localhost:3000';
const data = { url: 'www.google.com', shortHash: '3Yr' };
const userProps = { name: 'Dylan', email: "dylan.kirby0128@gmail.com" };

const fakeKey = 'sfsa43853wrweajfklsdgag48923239r8aklsfjsdf'

describe('Developer access to API routes', (done) => {

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
			.then(() => {
				const testUser = new User({
					name: 'test',
					email: 'test@test.com'
				})

				testUser.save((err, doc) => {
					if(err){ console.log(err) }
					else { 
						userProps.API_KEY = `${doc._id}`;
						done();
					}
				})
			})
			.catch(() => done());
	})

	xit('Cannot make an unauthorized call to the API', (done) => {
		needle.post(`${baseUrl}/api/shorten`, {API_KEY: fakeKey, url: data.url}, (err, res) => {
			if(err){
				console.log(err)
			} else {
				assert(!res.body.url);
				done();
			}
		});
	});

	it('Can make an authorized call to the API', (done) => {
		needle.post(`${baseUrl}/api/shorten`, {API_KEY: userProps.API_KEY, url: data.url}, (err, res) => {
			if(err){
				console.log(err)
			} else {
				assert(res.body.url == data.shortHash);
				done();
			}
		});		
	});
});