import Component from '@glimmer/component';
import { service } from '@ember/service';
// import { action } from '@ember/object';

export default class CheckoutMainComponent extends Component {
  @service('shopping-cart') cart;
}
