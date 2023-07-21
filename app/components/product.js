import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ProductComponent extends Component {
  @tracked quantity = 0;

  get totalPrice() {
    return !this.quantity
      ? this.args.product.price.toFixed(2)
      : (this.quantity * this.args.product.price).toFixed(2);
  }

  @action
  addToCart() {
    this.quantity++;
  }
  @action
  deleteFromCart() {
    this.quantity--;
  }
}
