import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | Products', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /products', async function (assert) {
    await visit('/products');

    assert.strictEqual(currentURL(), '/products');

    // You can add more assertions here to check the rendered content
    assert.dom('h1').hasText('Groceries');
    assert
      .dom('p')
      .hasText('Special FX offers only the finest organic produce.');
  });
});
