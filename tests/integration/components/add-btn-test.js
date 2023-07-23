import { module, test } from 'qunit';
import { setupRenderingTest } from '../../helpers';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | add-btn', function (hooks) {
  setupRenderingTest(hooks);

  test('it adds item to cart when clicked', async function (assert) {
    // Set up the test data for the component
    this.set('product', {
      id: 1,
      name: 'Product 1',
      quantity: 1,
      discountedTotalPrice: 10.0,
      price: 20.0,
      code: 'ABC123',
      discountDescription: '50% off',
    });

    this.set('image', 'product.jpg');

    // Render the component with the test data
    await render(
      hbs`<AddBtn @product={{this.product}} @discountDescription={{this.product.discountDescription}} @image={{this.image}} />`
    );

    // Click on the add button
    await click('.hover\\:bg-violet-500');

    // Check if the item is added to the cart
    assert.dom('.my-2').hasText('2');
  });

  test('it removes item from cart when clicked', async function (assert) {
    // Set up the test data for the component
    this.set('product', {
      id: 1,
      name: 'Product 1',
      quantity: 2,
      discountedTotalPrice: 10.0,
      price: 20.0,
      code: 'ABC123',
      discountDescription: '50% off',
    });

    this.set('image', 'product.jpg');

    // Render the component with the test data
    await render(
      hbs`<AddBtn @product={{this.product}} @discountDescription={{this.product.discountDescription}} @image={{this.image}} />`
    );

    // Click on the delete button
    await click('.px-3');

    // Check if the item is removed from the cart
    assert.dom('.my-2').hasText('1');
  });

  test('trash icon is hidden when quantity is more than 1', async function (assert) {
    // Set up the test data for the component
    this.set('product', {
      id: 1,
      name: 'Product 1',
      quantity: 1,
      discountedTotalPrice: 10.0,
      price: 20.0,
      code: 'ABC123',
      discountDescription: '50% off',
    });

    this.set('image', 'product.jpg');

    // Render the component with the test data
    await render(
      hbs`<AddBtn @product={{this.product}} @discountDescription={{this.product.discountDescription}} @image={{this.image}} />`
    );

    // Check if the trash icon is hidden when quantity is 1
    assert.dom('button span').hasText('');
  });
});
