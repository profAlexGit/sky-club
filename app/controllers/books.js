import Controller from '@ember/controller';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';

export default class BooksController extends Controller {
	@service store;
	@service booksService;
	queryParams = ['search', 'tag'];

	@tracked search = '';
	@tracked tag = 'all';
	@tracked isLoading;

	@tracked authors = null;
	@tracked currentBook = null;
	@tracked isUpdate = false;
	@tracked title = this.currentBook.title;
	@tracked pages = this.currentBook.pages;
	@tracked cover = this.currentBook.cover;
	@tracked description = this.currentBook.description;
	@tracked author = null;

	tags = ['all', 'detective', 'novel', 'adventures'];

	async init() {
		super.init(...arguments);
	}

	@action
	handleTagChange(value) {
		this.tag = value;
	}

	@action
	async handleCreateBook() {
		this.title = '';
		this.pages = '';
		this.cover = '';
		this.description = '';
		const authors = await this.store.findAll('authors');
		this.authors = authors.map((author, index) => {
			return authors.objectAt(index);
		});

		this.author = this.authors[0];
		this.isUpdate = true;
	}

	@action
	async handleUpdateClick(id) {
		this.currentBook = await this.store.peekRecord('books', id);
		this.title = this.currentBook.title;
		this.pages = this.currentBook.pages;
		this.cover = this.currentBook.cover;
		this.description = this.currentBook.description;
		const authors = await this.store.findAll('authors');
		this.authors = authors.map((author, index) => {
			return authors.objectAt(index);
		});

		this.author = await this.store.peekRecord('authors', this.currentBook.authors.id);
		this.isUpdate = true;
	}

	@action
	async handleDeleteBook(id) {
		const book = this.store.peekRecord('books', id);
		book.destroyRecord();
	}

	@action
	async closeModal() {
		this.currentBook = null;
		this.isUpdate = false;
	}

	@action
	async submitUpdateHandler(props) {
		let self = this;
		if (!this.currentBook) {
			const book = await this.store.createRecord('books', {
				title: this.title,
				pages: this.pages,
				cover: this.cover,
				description: this.description,
				authors: {
					id: this.author.id,
					firstName: this.author.firstName,
					lastName: this.author.lastName,
				},
			});
			book.save().then(function (book) {
				self.transitionToRoute('books', book);
			});
		} else {
			const book = await this.store.findRecord('books', this.currentBook.id).then((book) => {
				console.log(props);
				this.currentBook.authorsId = this.author.id;
				const {pages, description, cover} = this.currentBook;
				book.title = this.title;
				book.pages = this.pages;
				book.authors = {
					id: this.author.id,
					firstName: this.author.firstName,
					lastName: this.author.lastName,
				};
				book.authorsId = this.author.id;
				book.description = this.description;
				book.cover = this.cover;

				book.save().then(function () {
					self.transitionToRoute('books');
				});
				// delete this.currentBook.authors;
			});
		}
		// this.model.books = await this.booksService.fetchBooks(this.store);
		this.closeModal();
		this.currentBook = null;
		this.author = null;
		this.isUpdate = false;
	}
}
