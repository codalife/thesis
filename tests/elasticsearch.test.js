const script = require('../dbs/elasticsearch');

test('has all methods', () => {
	expect(script).toMatchSnapshot();
})