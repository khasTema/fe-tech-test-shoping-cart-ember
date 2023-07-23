import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Service from '@ember/service';

class StoreStub extends Service {
  findAll() {
    return Promise.resolve([
      { id: 1, name: 'Product 1', price: 10.0, code: 'ABC123' },
      { id: 2, name: 'Product 2', price: 20.0, code: 'XYZ456' },
    ]);
  }
}

module('Unit | Service | shopping-cart', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:store', StoreStub);
  });

  test('it adds items to the cart', function (assert) {
    const cartService = this.owner.lookup('service:shopping-cart');
    const item = {
      id: 1,
      name: 'Product 1',
      price: 10.0,
      code: 'ABC123',
      quantity: 1,
    };

    // Add the item to the cart
    cartService.add(item);

    // Check if the item is added to the cartItems array
    assert.strictEqual(cartService.cartItems.length, 1);
    assert.strictEqual(cartService.cartItems[0].quantity, 1);

    // Add the same item again
    cartService.add(item);

    // Check if the quantity of the item is updated in the cartItems array
    assert.strictEqual(cartService.cartItems.length, 1);
    assert.strictEqual(cartService.cartItems[0].quantity, 2);
  });

  test('it calculates the total quantity in the cart', function (assert) {
    const cartService = this.owner.lookup('service:shopping-cart');
    const item1 = { id: 1, quantity: 2 };
    const item2 = { id: 2, quantity: 3 };

    // Add items to the cart
    cartService.cartItems.pushObjects([item1, item2]);

    // Check if the total quantity is calculated correctly
    assert.strictEqual(cartService.totalQuantity, 5);
  });

  test('it calculates the total price without discounts', function (assert) {
    const cartService = this.owner.lookup('service:shopping-cart');
    const item1 = { id: 1, quantity: 2, price: 10.0 };
    const item2 = { id: 2, quantity: 3, price: 20.0 };

    // Add items to the cart
    cartService.cartItems.pushObjects([item1, item2]);

    // Check if the total price without discounts is calculated correctly
    assert.strictEqual(
      cartService.totalNoDiscountCartPrice,
      2 * 10.0 + 3 * 20.0
    );
  });
});
