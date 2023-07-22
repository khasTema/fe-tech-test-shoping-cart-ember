import { A } from '@ember/array';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ShoppingCartService extends Service {
  @tracked cartItems = A([]);

  add(item) {
    const existingItem = this.cartItems.findBy('id', item.id);
    if (existingItem) {
      const newItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
        discountedTotalPrice: this.totalItemDiscountedPrice({
          ...existingItem,
          quantity: existingItem.quantity + 1,
        }),
      };
      this.cartItems.removeObject(existingItem);
      this.cartItems.pushObject(newItem);
    } else {
      const newItem = {
        ...item,
        discountedTotalPrice: this.totalItemDiscountedPrice(item),
      };
      this.cartItems.pushObject(newItem); // Push the new item into the cartItems array
    }
  }

  remove(id) {
    // gets id from product card
    const existingItem = this.cartItems.findBy('id', id);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        // If the quantity is greater than 1, create a new item with decremented quantity
        const newItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
          discountedTotalPrice: this.totalItemDiscountedPrice({
            ...existingItem,
            quantity: existingItem.quantity - 1,
          }),
        };
        this.cartItems.removeObject(existingItem);
        this.cartItems.pushObject(newItem);
      } else {
        // If the quantity is 1, remove the item from the array
        this.cartItems.removeObject(existingItem);
      }
    }
  }

  // whole amount of items in the cart
  get totalQuantity() {
    let quantity = 0;
    this.cartItems.forEach((item) => (quantity += item.quantity));
    return quantity;
  }

  // whole ammount without discounts
  get totalNoDiscountCartPrice() {
    let noDiscountPrice = 0;
    this.cartItems.forEach((item) => {
      noDiscountPrice += item.quantity * item.price;
    });
    return noDiscountPrice;
  }

  // whole amount with discounts applied
  get totalCartPrice() {
    let priceAmmount = 0;
    this.cartItems.forEach(
      (item) => (priceAmmount += item.discountedTotalPrice)
    );
    return priceAmmount;
  }

  totalItemDiscountedPrice(item) {
    if (!item.quantity) {
      return parseFloat(item.price.toFixed(2));
    } else {
      let totalPrice;
      switch (item.code) {
        case 'GR1':
          totalPrice = (Math.ceil(item.quantity / 2) * item.price).toFixed(2);
          break;
        case 'SR1':
          if (item.quantity >= 3) {
            totalPrice = (item.quantity * 4.5).toFixed(2);
          } else {
            totalPrice = (item.quantity * item.price).toFixed(2);
          }
          break;
        case 'CF1':
          if (item.quantity >= 3) {
            totalPrice = ((2 / 3) * item.quantity * item.price).toFixed(2);
          } else {
            totalPrice = (item.quantity * item.price).toFixed(2);
          }
          break;
        default:
          totalPrice = (item.quantity * item.price).toFixed(2);
      }
      return parseFloat(totalPrice);
    }
  }
}
