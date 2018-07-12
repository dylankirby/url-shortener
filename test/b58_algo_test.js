const assert = require('assert');
const b58 = require('../middlewares/base_58_algo');

const knownCase = {
	integer: 10000,
	string: "6YsVGJT"
}

describe('Routes', () => {
	it('Takes a integer, and return a string of base 58', (done) => {
		assert(b58.encode(knownCase.integer) == knownCase.string);
	});

	it('Takes a string, and return an integer', (done) => {
		assert(b58.decode(knownCase.string) == knownCase.integer);
	});
});