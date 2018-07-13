const assert = require('assert');
const b58 = require('../middlewares/base_58');

const knownCase = {
	integer: 10000,
	string: "3Yq"
}

describe('Base58 Algorithm', () => {
	it('Takes a integer, and return a string of base 58', (done) => {
		assert(b58.encode(knownCase.integer) == knownCase.string);
		done();
	});

	it('Takes a string, and return an integer', (done) => {
		assert(b58.decode(knownCase.string) == knownCase.integer);
		done();
	});
});