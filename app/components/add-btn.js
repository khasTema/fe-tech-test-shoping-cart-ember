import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AddBtnComponent extends Component {
  @service('shopping-cart') cart;
  @tracked quantity = this.args.product.quantity || 0;

  @action
  addToCart() {
    this.quantity++;
    const { product } = this.args;
    let cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      code: product.code,
      quantity: 1,
      // discountedTotalPrice: this.totalPrice,
      // promo: this.discountDescription,
      // image: this.productImage,
    };
    this.cart.add(cartProduct);
    console.log(cartProduct);
    console.log(this.cart.cartItems);
    console.log(this.quantity);
  }

  @action
  deleteFromCart() {
    this.quantity--;
    this.cart.remove(this.args.product.id);
    console.log(this.args.product.id);
  }

  get isTrashIconShown() {
    return this.quantity < 2;
  }
}
