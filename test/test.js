const assert = require('assert');
const needle = require('needle');

describe('Routes', () => {
	it('takes in a url and returns that url', (done) =>{
		const data = {
			url: 'www.google.com'
		}

		needle.post('http://localhost:3000/api/return', data, (err, response) => {
			if(err){
				console.log(err);
				assert(1==2);
			} else {
				assert(data.url === response.body.url);
				done();
			}
		})
	});

	it('takes in a url, and returns a shortened url', ()=> {
	});

	it('takes in a shortened url, and redirects to the corresponding website', () => {
	});

});