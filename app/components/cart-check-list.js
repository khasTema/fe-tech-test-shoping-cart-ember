import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class CartCheckListComponent extends Component {
  @service('shopping-cart') cart;

  get reducedDiscountAmmount() {
    return (
      this.cart.totalNoDiscountCartPrice - this.cart.totalCartPrice
    ).toFixed(2);
  }

  get subtotal() {
    return this.cart.totalNoDiscountCartPrice.toFixed(2);
  }

  get total() {
    return this.cart.totalCartPrice.toFixed(2);
  }

  get shippingCost() {
    let distance = 0;
    return (this.cart.totalCartPrice * distance).toFixed(2);
  }
}
