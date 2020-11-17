import Controller from '@ember/controller';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';

export default class BooksController extends Controller {
	@service store;
	@service booksService;
	queryParams = ['search', 'tag'];
	modalTitle = '';

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

	getAuthor = async (currentBook) => {
		if (currentBook) {
			return await this.store.peekRecord('authors', currentBook.authors.id);
		}

		return this.authors[0];
	};

	initialFormData = async (book) => {
		this.modalTitle = book ? 'Редактирование' : 'Добавление';
		this.title = book?.title || '';
		this.pages = book?.pages || '';
		this.cover = book?.cover || '';
		this.description = book?.description || '';
		const authors = await this.store.findAll('authors');
		this.authors = authors.map((author, index) => {
			return authors.objectAt(index);
		});

		this.author = await this.getAuthor(book)
		this.isUpdate = true;
	};

	getNewBookData = () => {
		return {
			title: this.title,
			pages: this.pages,
			cover: this.cover,
			description: this.description,
			authors: this.author,
			authorsId: this.author.id,
		};
	};

	async init() {
		super.init(...arguments);
	}

	@action
	handleTagChange(value) {
		this.tag = value;
	}

	@action
	async handleLoadBookForm(id) {
		if (id) {
			this.currentBook = await this.store.peekRecord('books', id);
			return this.initialFormData(this.currentBook);
		}

		this.initialFormData();
	}

	@action
	async handleDeleteBook(id) {
		this.booksService.deleteBook(this.store, id);
	}

	@action
	async closeModal() {
		this.currentBook = null;
		this.isUpdate = false;
	}

	@action
	async submitUpdateHandler() {
		let self = this;
		const newBook = this.getNewBookData();
		if (!this.currentBook) {
			await this.booksService.addBook(this.store, newBook, self);
		} else {
			await this.booksService.updateBook(this.store, this.currentBook.id, newBook);
		}
		
		this.closeModal();
		this.currentBook = null;
		this.author = null;
		this.isUpdate = false;
	}
}
