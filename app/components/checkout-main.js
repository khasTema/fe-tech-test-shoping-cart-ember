import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class CheckoutMainComponent extends Component {
  @service('shopping-cart') cart;

    
}
