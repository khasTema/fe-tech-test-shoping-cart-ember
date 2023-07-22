import { A } from '@ember/array';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ShoppingCartService extends Service {
  @tracked items = A([]);

  add(item) {
    this.items.pushObject(item);
    console.log(this.items);
  }

  remove(item) {
    this.items.removeObject(item);
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
