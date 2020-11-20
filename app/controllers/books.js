import Controller from '@ember/controller';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';

export default class BooksController extends Controller {
	@service store;

	queryParams = ['search', 'tag'];

	@tracked search = '';
	@tracked tag = 'all';
	@tracked isLoading;

	tags = ['all', 'detective', 'novel', 'adventures'];

	@action
	handleTagChange(value) {
		this.tag = value;
	}

	@action
	async handleDeleteBook(id) {
		const speaker = this.store.peekRecord('book', id);
		speaker.destroyRecord();
	}
}
