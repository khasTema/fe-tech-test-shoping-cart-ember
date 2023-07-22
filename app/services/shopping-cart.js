import { A } from '@ember/array';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ShoppingCartService extends Service {
  @tracked items = A([]);

  add(item) {
    const existingItem = this.items.findBy('id', item.id);
    if (existingItem) {
      const index = this.items.indexOf(existingItem); // If an item with the same id exists, delete it and then replace it with the new item
      this.items.removeAt(index);
    }
    this.items.pushObject(item); // Push the new item into the items array
    console.log(this.items);
  }

  remove(id) {
    // gets id from product card
    const existingItem = this.items.findBy('id', id);
  
    if (existingItem) {
      if (existingItem.quantity > 1) {
        // If the quantity is greater than 1, decrement it by 1
        existingItem.quantity -= 1;
      } else {
        // If the quantity is 1, remove the item from the array
        this.items.removeObject(existingItem);
      }
    }
    console.log(this.items);
  }

  get totalQuantity() {
    let quantity = 0;
    this.items.forEach((item) => (quantity += item.quantity));
    return quantity;
  }

  get totalCartPrice() {
    let priceAmmount = 0;
    this.items.forEach((item) => (priceAmmount += item.totalPrice));
    return priceAmmount;
  }
}
