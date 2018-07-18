const assert = require('assert');

const clean = require('../middlewares/clean_url');

const url = {
	long: 'http://www.google.com',
	short: 'www.google.com'
}

describe('Url Cleaning Algorith', () =>{
	it('Takes in a url exclduing protocol and returns that url untouched', (done) =>{
		assert(clean(url.short) == url.short);
	});

	it('Take in a url including protocol and returns that url without the protocol', (done) =>{
		assert(clean(url.long) == url.short);
	});
})