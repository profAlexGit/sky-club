import Route from '@ember/routing/route';
import {tracked} from '@glimmer/tracking';


export default class AccountEditOrderRoute extends Route {
	@tracked showModal = true;

	model({id}) {
        return this.store.findRecord('order', id);
	}
}
