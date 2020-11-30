import Component from '@glimmer/component';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import {inject as service} from '@ember/service';



export default class NewBookModalComponent extends Component {
	@tracked showModal = false;
	@service store;

	@action
	searchAuthor(query) {
		return this.store.query('author', {q: query});
	}

	@action
	closeModal() {
		this.showModal = false;
	}

	book = {
		title: '',
		cover: '',
		description: '',
		author: null,
		tags: [],
		pages: '',
		raiting: '',
	};

	@action
	async saveBook(book) {
		try {
			const newBook = this.store.createRecord('book', book);
			await newBook.save();
			this.closeModal();
			this.args.onSave(newBook);
		} catch (e) {
			throw new Error('some error');
		}
	}
}
