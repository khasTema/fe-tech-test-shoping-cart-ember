import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class CartCheckListComponent extends Component {
  @service('shopping-cart') cart;
}