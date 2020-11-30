import Controller from '@ember/controller';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';



export default class AccountController extends Controller {
    @tracked isLoading;
    
    @action
    deleteOrder(id) {
        const order = this.store.peekRecord('order', id);
		order.destroyRecord();
    }

	get validationOrders() {
		return this.model?.orders?.filter((order) => order.status === 'validation');
	}

	get newOrders() {
		return this.model?.orders?.filter((order) => order.status === 'new');
    }
}
