import { module, test } from 'qunit';
import { setupRenderingTest } from '../../helpers';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | product', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set up the test data for the component
    this.set('product', {
      code: 'GR1',
      name: 'Product 1',
      quantity: 2,
    });

    // Render the component with the test data
    await render(hbs`<Product @product={{this.product}} />`);

    // Check if the component's elements are rendered correctly
    assert.dom('p').hasText('Product 1');
  });

  test('it displays the correct discount description for different product codes', async function (assert) {
    const product = {
      code: 'SR1',
      name: 'Product 2',
      quantity: 1,
    };

    this.set('product', product);

    // The component will render the PromoBadge component
    await render(hbs`<Product @product={{this.product}} />`);

    // Get the rendered PromoBadge component instance and check its content
    const promoBadgeComponent = this.element.querySelector(
      '.absolute.top-2.right-2'
    );
    assert.dom(promoBadgeComponent).hasText('3 for £13.50');

    // Change the product code
    this.set('product.code', 'CF1');

    // Rerender the component to reflect the new discount description
    await render(hbs`<Product @product={{this.product}} />`);

    // Get the updated PromoBadge component instance and check its content
    const updatedPromoBadgeComponent = this.element.querySelector(
      '.absolute.top-2.right-2'
    );
    assert.dom(updatedPromoBadgeComponent).hasText('Multi-buy Discount');

    // Change the product code to an unknown code
    this.set('product.code', 'UnknownCode');

    // Rerender the component to reflect the new discount description
    await render(hbs`<Product @product={{this.product}} />`);

    // Get the updated PromoBadge component instance and check its content
    const unknownPromoBadgeComponent = this.element.querySelector(
      '.absolute.top-2.right-2'
    );
    assert.dom(unknownPromoBadgeComponent).hasText('');
  });
});
