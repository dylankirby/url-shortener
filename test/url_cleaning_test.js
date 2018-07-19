const assert = require('assert');

const urlCleaner = require('../middlewares/clean_url');

const url = {
	long: 'http://www.google.com',
	longSecure: 'https://www.google.com',
	short: 'www.google.com'
}

describe('Url Cleaning Algorith', () =>{
	it('Takes in a url exclduing protocol and returns that url untouched', (done) =>{
		assert(urlCleaner.clean(url.short) == url.short);
		done();
	});

	it('Take in a url including protocol and returns that url without the protocol', (done) =>{
		assert(urlCleaner.clean(url.long) == url.short);
		done();
	});

	it('Also cleans protocol for https', (done) => {
		assert(urlCleaner.clean(url.longSecure) == url.short);
		done();		
	})
})