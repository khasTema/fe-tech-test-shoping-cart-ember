import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class AddBtnComponent extends Component {
  @action
  deleteFromCart() {
    this.args.deleteFromCart();
  }

  @action
  addToCart() {
    this.args.addToCart();
  }

  get isTrashIconShown() {
    return this.args.quantity < 2;
  }
}
