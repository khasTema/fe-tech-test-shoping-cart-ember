import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class ItemCountComponent extends Component {
  @service('shopping-cart') cart;

  get ProductsQuantity() {
    return this.cart.totalQuantity;
  }

  get showPlural() {
    return this.cart.totalQuantity !== 1;
  }
}
