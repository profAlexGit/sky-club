import Route from '@ember/routing/route';
import {tracked} from '@glimmer/tracking';



export default class AccountCreateOrderRoute extends Route {
    @tracked showModal = true;
    
	model() {
		const date = new Date();
		return {
			date: date.toISOString(),
			book: null,
		};
	}
}
