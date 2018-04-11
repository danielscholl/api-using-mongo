const test = require('tape');

const config = require('./config');
const db = require('@danielscholl/mongo-lib');
const Service = require('../lib/service');
const Item = require('../lib/models').Item;

// const client = new DbClient(config);
const service = new Service(config);

const before = test;
const after = test;
let Database, id;

before('Database Connect', assert => {
	db.connect({db: 'test'}, (err, db) => {
		assert.ok(err === null, 'Database Connection Opened');
		assert.ok(db, 'should return a database when Opened');

		db.dropDb('test', (err, result) => {
			assert.ok(err === null, 'Database Table Dropped');
			assert.ok(result, 'should return true if Database Dropped');

			db.install(['Item'], (err, actual) => {
				assert.ok(actual, 'should return true if collection created');
				assert.end();
			});
    });
  });
});


test('creates an item and returns it', assert => {
  const obj = {
    name: 'Test 1',
    description: 'UNITTEST',
    active: true,
    list: [
      'something',
      'else'
    ]
  };
  const item = new Item(obj);
  service.create(item, (err, result) => {
    assert.ok(err === null, 'No Service Error');
    assert.ok(result.success, 'Should be success');
    assert.same('Success', result.message, 'Message should be success');
    assert.ok(result.data.id !== null, 'Id Should exist');
    assert.same(obj.name, result.data.name, 'Name should be the same as submitted');
    id = result.data.id;
    assert.end();
  });
});

test('returns an item by id', assert => {
  service.read({id: id}, (err, result) => {
    assert.ok(err === null, 'No Service Error');
    assert.ok(result.success, 'Should be success');
    assert.ok('Success', result.message, 'Message should be success');
    assert.same(id, result.data.id, 'Item should be returned');
    assert.end();
  });
});

test('updates an item by id', assert => {
  const obj = {
    id: id,
    name: 'Test 1',
    description: 'CHANGED',
    active: false,
    list: [
      'something',
      'else'
    ]
  };
  service.update(obj, (err, result) => {
    assert.ok(err === null, 'No Service Error');
    assert.ok('Success', result.message, 'Message should be success');
    assert.same(id, result.data.id, 'Item should be returned');
    assert.same(result.data.description, 'CHANGED');
    assert.end();
  });
});

test('list all items', assert => {
  service.list({}, (err, result) => {
    assert.ok(err === null, 'No Service Error');
    assert.ok(result.success, 'Result Should be success');
    assert.same('Success', result.message, 'Message should say Success');
    assert.same(result.data.count, result.data.list.length, 'Count should be valid');
    assert.end();
  });
});

test('deletes an item by id', assert => {
  service.delete({id: id}, (err, result) => {
    assert.ok(err === null, 'No Service Error');
    assert.ok(result.success, 'Result Should be success');
    assert.same('Success', result.message, 'Message should say Success');
    assert.end();
  });
});

test('if item does not exist returns not found', assert => {
  service.read({id: id}, (err, result) => {
    assert.ok(err === null, 'No Service Error');
    assert.notOk(result.success, 'Should not be success');
    assert.ok('Success', result.message, 'NOTFOUND');
    assert.end();
  });
});

after('after', assert => {
	db.close();
	assert.ok(true, 'Database Connection Closed');
	assert.end();
  process.exit(0);
});
