const script = require('../dbs/elasticsearch');

test('has have methods', () => {
	expect(script).toMatchSnapshot();
})