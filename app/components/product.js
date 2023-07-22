import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class ProductComponent extends Component {
  @tracked quantity = 0;
  @service('shopping-cart') cart;

  get totalPrice() {
    const { product } = this.args;
    if (!this.quantity) {
      return product.price.toFixed(2);
    } else {
      let totalPrice;
      switch (product.code) {
        case 'GR1':
          totalPrice = (Math.ceil(this.quantity / 2) * product.price).toFixed(
            2
          );
          break;
        case 'SR1':
          if (this.quantity >= 3) {
            totalPrice = (this.quantity * 4.5).toFixed(2);
          } else {
            totalPrice = (this.quantity * product.price).toFixed(2);
          }
          break;
        case 'CF1':
          if (this.quantity >= 3) {
            totalPrice = ((2 / 3) * this.quantity * product.price).toFixed(2);
          } else {
            totalPrice = (this.quantity * product.price).toFixed(2);
          }
          break;
        default:
          totalPrice = (this.quantity * product.price).toFixed(2);
      }
      return parseFloat(totalPrice);
    }
  }

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

  get isconIsShown() {
    return this.quantity < 2;
  }

  @action
  addToCart() {
    this.quantity++;
    const { product } = this.args;
    let cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      code: product.code,
      quantity: this.quantity,
      totalPrice: this.totalPrice,
      promo: this.discountDescription,
      image: this.productImage,
    };
    this.cart.add(cartProduct);
  }
  @action
  deleteFromCart() {
    this.quantity--;
    const { product } = this.args;
    this.cart.remove(product.id); // sent to shopping-cart service
  }
}
