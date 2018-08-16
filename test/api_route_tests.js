const assert = require('assert');
const needle = require('needle');

const base_url = 'http://localhost:3000'
const data = { url: 'www.google.com', shortHash: '3Yr' }

describe('Routes', () => {
	//This tests is deprecated since the introduction of APIKEY restriction to access the shortening route
	xit('Takes a url, and returns a shortened URL', (done) => { 
		needle.post(`${base_url}/api/shorten`, data, (err, res) => {
			if(err){
				console.log(err);
				assert(1==2);
			} else {
				assert(data.url.length > res.body.url.length);
				done();
			}
		});
	});

	it('Takes a shortened URL, and returns the original url', (done) => {
		needle.get(`${base_url}/${data.shortHash}`, (err, res) => {
			if(err){
				console.log(err);
				assert(1==2);
			} else {
				assert(res.body.includes('www.google.com'));
				done();
			}
		});
	});
});