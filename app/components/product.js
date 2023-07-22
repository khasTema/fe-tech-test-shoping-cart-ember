import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class ProductComponent extends Component {
  @tracked quantity = 0;
  @service('shopping-cart') cart;

  get discountDescription() {
    const { product } = this.args;
    switch (product.code) {
      case 'GR1':
        return '2 for 1';
      case 'SR1':
        return '3 for £13.50';
      case 'CF1':
        return 'Multi-buy Discount';
      default:
        return '';
    }
  }

  get productImage() {
    const { product } = this.args;
    switch (product.code) {
      case 'GR1':
        return 'images/gr1.png';
      case 'SR1':
        return 'images/sr1.png';
      case 'CF1':
        return 'images/cf1.png';
      default:
        return '';
    }
  }
}
