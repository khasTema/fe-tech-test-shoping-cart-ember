import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | Checkout', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /checkout', async function (assert) {
    // Visit the /checkout page
    await visit('/checkout');

    // Assert that the current URL is /checkout
    assert.strictEqual(currentURL(), '/checkout');

    // Assert that the page title is set correctly
    assert.dom('h1').hasText('Shopping Cart');

    // Assert that the "Continue shopping" link exists and contains the correct text and icon
    assert.dom('.backit a').exists();
    assert.dom('.backit a').hasText('Continue shopping');
    assert.dom('.backit a img').exists();
    assert.dom('.backit a img').hasAttribute('alt', 'back');

    // Assert that the "Shopping Cart" heading and subheading are displayed correctly
    assert.dom('h2').hasText('Summary');
    assert.dom('p').hasText('You have 0 items in your cart.');

    // Assert that the <CheckoutMain /> component is rendered
    assert.dom('.name-products-list').exists();
    assert.dom('.name-checkout-list').exists();
  });
});
