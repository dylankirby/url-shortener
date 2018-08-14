const assert = require('assert');
const needle = require('needle');

const baseUrl = 'http://localhost:3000';
const data = { url: 'www.google.com', shortHash: '3Yq' };
const userProps = { name: 'Dylan', email: "dylan.kirby0128@gmail.com" };

const fakeKey = 'sfsa43853wrweajfklsdgag48923239r8aklsfjsdf'

describe('Developer access to API routes', (done) => {
	
	before((done) => {
		mongoose.connect('mongodb://localhost:27017/url_shortner');
		mongoose.connection
			.once('open', () => {
				needle.post(`${baseUrl}/dev/user`, userProps, (err, res) => {
					if(err){
						console.log(err)
					} else {
						userProps.API_KEY = res.body.user._id;
						done();
					}
				}
			}))
			.on('error', (error) => {
				console.warn('Connection Error: ', error);
			});
	});

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