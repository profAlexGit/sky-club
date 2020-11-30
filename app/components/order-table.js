import Component from '@glimmer/component';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';


export default class OrderTableComponent extends Component {
	@service store;

	@action
	deleteOrder(id) {
		const order = this.store.peekRecord('order', id);
		order.destroyRecord();
	}
}
