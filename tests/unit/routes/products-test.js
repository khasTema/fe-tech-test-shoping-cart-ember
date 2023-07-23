import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Service from '@ember/service';
import { Promise } from 'rsvp';

class StoreStub extends Service {
  findAll() {
    return Promise.resolve([
      { id: 1, name: 'Product 1', price: 10.0, code: 'ABC123' },
      { id: 2, name: 'Product 2', price: 20.0, code: 'XYZ456' },
    ]);
  }
}

module('Unit | Route | products', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:store', StoreStub);
  });

  test('it fetches products from the store', async function (assert) {
    const route = this.owner.lookup('route:products');
    const model = await route.model();
    assert.strictEqual(model.length, 2);
    assert.strictEqual(model[0].name, 'Product 1');
    assert.strictEqual(model[1].name, 'Product 2');
  });
});
