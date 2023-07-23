import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | product', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    // Get the store service
    const store = this.owner.lookup('service:store');

    // Create a new instance of the ProductModel using the store
    const product = store.createRecord('product', {
      name: 'Test Product',
      price: 10.0,
      code: 'ABC123',
    });

    // Check if the model instance is created successfully
    assert.ok(product);
    assert.strictEqual(product.name, 'Test Product');
    assert.strictEqual(product.price, 10.0);
    assert.strictEqual(product.code, 'ABC123');
  });
});
