const assert = require('assert');
const needle = require('needle');

const base_url = 'http://localhost:3000'

describe('Routes', () => {
	it('takes in a url and returns that url', (done) =>{
		const data = {
			url: 'www.google.com'
		}

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
});