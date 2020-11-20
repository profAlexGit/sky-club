import Controller from '@ember/controller';
import {tracked} from '@glimmer/tracking';
import {assign} from '@ember/polyfills';
import {action} from '@ember/object';

export default class BooksEditController extends Controller {
	@tracked author = this.model.author;

	@action
	searchAuthor(query) {
		return this.store.query('author', {q: query});
	}

	@action
	closeModal() {
		this.transitionToRoute('books.index');
	}

	@action
	async saveBook(book) {
		try {
			assign(this.model, book);
			await this.model.save();

			this.transitionToRoute('books');
		} catch (e) {
			throw new Error('unknown error');
		}
	}
}
