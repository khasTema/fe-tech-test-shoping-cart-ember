import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class CartProductComponent extends Component {
  @service('shopping-cart') cart;
}
