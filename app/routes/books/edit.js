import Route from '@ember/routing/route';
import {tracked} from '@glimmer/tracking';

export default class BooksEditRoute extends Route {
	@tracked showModal = true;

	model({id}) {
		return this.store.findRecord('book', id);
	}
}
