const db = require('../db');

test('has to exist', () => {
	expect(db).toMatchSnapshot();
})

