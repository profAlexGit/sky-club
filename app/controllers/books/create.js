import Controller from '@ember/controller';
import {action} from '@ember/object';


export default class BooksCreateController extends Controller {
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
			const newBook = this.store.createRecord('book', book);

			await newBook.save();

			this.transitionToRoute('books.index');
		} catch (e) {
			throw new Error('some error');
		}
	}
}
