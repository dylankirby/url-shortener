const assert = require('assert');
const needle = require('needle');

const base_url = 'http://localhost:3000'
const data = { url: 'www.google.com' }

describe('Routes', () => {
	it('takes in a url and returns that url', (done) =>{
		needle.post('http://localhost:3000/api/return', data, (err, res) => {
			if(err){
				console.log(err);
				assert(1==2);
			} else {
				assert(data.url === res.body.url);
				done();
			}
		})
	});

	it('Takes a url, and returns a shortened URL', (done) => {
		needle.post(`${base_url}/api/shorten`, data, (err, res) => {
			if(err){
				console.log(err);
				assert(1==2);
			} else {
				console.log(res)
				assert(data.url.length > res.body.url.length);
				done();
			}
		});
	});
});