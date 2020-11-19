import Service from '@ember/service';

export default class BooksServiceService extends Service {
	getAuthors = async (books, store) => {
		const result = Promise.all(
			books.map(async (book) => {
				const author = await store.findRecord('authors', book.authors);
				book.authors = author;
				return book;
			})
		);
		return result;
	};

	async fetchBooks(store, search, tag) {
		const queryParams = {};
		if (search) {
			queryParams.q = search;
		}
		if (tag && tag !== 'all') {
			queryParams.tags_like = tag;
		}
		const books = await store.query('books', queryParams); //
		return books;
	}

	async updateBook(store, id, data) {
		const {title, pages, authorsId, authors, description, cover} = data;
		await store.findRecord('books', id).then(async (book) => {
			book.title = title;
			book.pages = pages;
			book.authors = {
				id: authors.id,
				firstName: authors.firstName,
				lastName: authors.lastName,
			};
			book.authorsId = authorsId;
			book.description = description;
			book.cover = cover;

			await book.save();
		});
	}

	async deleteBook(store, id) {
		const book = await store.peekRecord('books', id);
		await book.destroyRecord();
	}

	async addBook(store, book, context) {
		const newBook = await store.createRecord('books', {
			...book,
		});
		newBook.save().then(function () {
			context.send('refreshModel');
			context.transitionToRoute('books');
		});
	}
}
