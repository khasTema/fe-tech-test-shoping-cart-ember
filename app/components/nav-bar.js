import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class NavBarComponent extends Component {
  @service('shopping-cart') cart;

  get isCartFiled() {
    return this.cart.totalQuantity > 0;
  }

  get ProductsQuantity() {
    return this.cart.totalQuantity;
  }

  get ProductsTotalPrice() {
    return this.cart.totalCartPrice;
  }
}
