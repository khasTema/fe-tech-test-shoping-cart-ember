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
      };
      this.cartItems.removeObject(existingItem);
      this.cartItems.pushObject(newItem);
    } else {
      this.cartItems.pushObject(item); // Push the new item into the cartItems array
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
        };
        this.cartItems.removeObject(existingItem);
        this.cartItems.pushObject(newItem);
      } else {
        // If the quantity is 1, remove the item from the array
        this.cartItems.removeObject(existingItem);
      }
    }
  }

  get totalQuantity() {
    let quantity = 0;
    this.cartItems.forEach((item) => (quantity += item.quantity));
    return quantity;
  }

  get totalCartPrice() {
    let priceAmmount = 0;
    this.cartItems.forEach(
      (item) => (priceAmmount += item.discountedTotalPrice)
    );
    return priceAmmount;
  }
}
