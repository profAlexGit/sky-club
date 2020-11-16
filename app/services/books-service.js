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
		const queryParams = {_expand: 'authors'};
		if (search) {
			queryParams.q = search;
		}
		if (tag && tag !== 'all') {
			queryParams.tags_like = tag;
		}
        const books = await store.query('books', queryParams); //
		return books;
	}

	// async updateBook(store, id, updatedBook) {
	// 	const book = await this.store.findRecord('books', id).then((book) => {
	// 		book.title = updatedBook.title;
	// 		book.pages = updatedBook.pages;
	// 		book.authors = {
	// 			id: updatedBook.authors.id,
	// 			firstName: updatedBook.authors.firstName,
	// 			lastName: updatedBook.authors.lastName,
	// 		};
	// 		book.authorsId = updatedBook.authors.id;
	// 		book.description = updatedBook.description;
	// 		book.cover = updatedBook.cover;

	// 		book.save();
	// 		// delete this.currentBook.authors;
	// 	});
	// }
}
