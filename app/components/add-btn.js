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
    const { product, discountDescription, image } = this.args;
    let cartProduct = {
      id: product.id,
      name: product.name,
      image: image,
      price: product.price,
      code: product.code,
      promo: discountDescription,
      quantity: 1,
      // discountedTotalPrice: this.totalPrice,
    };
    this.cart.add(cartProduct);
    // console.log(cartProduct);
    // console.log(this.cart.cartItems);
    // console.log(this.quantity);
  }

  @action
  deleteFromCart() {
    this.quantity--;
    this.cart.remove(this.args.product.id);
    // console.log(this.args.product.id);
    // console.log(this.cart.cartItems);
  }

  get isTrashIconShown() {
    return this.quantity < 2;
  }
}
