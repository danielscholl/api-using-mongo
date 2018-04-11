const test = require('tape');
const Model = require('../lib/models');

test('PageResult Model', assert => {
  const model = Model.PageResult();
  assert.ok(typeof model === 'object', 'model is an object');
  assert.same(0, model.pages, 'default pages should be 0');
  assert.same(0, model.currentPage, 'default currentPage should be 0');
  assert.same(0, model.count, 'default count should be 0');
  assert.same(0, model.list.length, 'list is an empty array');
  assert.end();
});

test('Response Model', assert => {
  const defaultModel = Model.Response();
  assert.ok(typeof defaultModel === 'object', 'model is an object');
  assert.notOk(defaultModel.success, 'default response.success is false');
  assert.notOk(defaultModel.message, 'default response.message is null');
  assert.notOk(defaultModel.data, 'default response.data is null');

  const params = {success: true, message: 'Success', data: 'Result'};
  const paramsModel = Model.Response(params);
  assert.same(params.success, paramsModel.success, 'success is mapped');
  assert.same(params.message, paramsModel.message, 'message is mapped');
  assert.same(params.data, paramsModel.data, 'data is mapped');
  assert.end();
});

test('Default Model', assert => {
  const empty = '';
  const model = Model.Item();
  assert.ok(typeof model === 'object', 'item is an object');
  assert.ok(model.id !== empty, 'id is not empty');
  assert.ok(model.name === empty, 'name is empty');
  assert.ok(model.description === 'Description', 'description defaults to "Description"');
  assert.ok(model.active, 'active should be true');
  assert.ok(model.list.length === 0, 'list should be empty');
  assert.ok(!model.errors(), 'validation should pass');
  assert.ok(typeof model.toJson() === 'object', 'Model should give valid JSON only');
  assert.end();
});

test('Model with Arguments', assert => {
  const empty = '';
  const seed = require('../lib/seed.json');
  const model = Model.Item(seed[0]);
  assert.ok(typeof model === 'object', 'item is an object');
  assert.ok(model.id !== empty, 'id is not empty');
  assert.ok(model.name === seed[0].name, 'name is passed args');
  assert.ok(model.description === seed[0].description, 'description defaults to "Description"');
  assert.ok(model.active, 'active should be true');
  assert.ok(model.list.length === 2, 'list should be filled');

  assert.end();
});
