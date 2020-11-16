import ApplicationAdapter from './application';

export default class BooksAdapter extends ApplicationAdapter {
	shouldReloadAll(store, snapshotsArray) {
		return true;
	}

	async findRecord(store, type, id, snapshot) {
		const book = await fetch(`${this.host}/books/${id}?_expand=authors`);
		return book.json();
	}
	
	async query(store, type, query) {
		const queryParams = ['_expand=authors'];
		Object.keys(query).forEach((value) => {
			queryParams.push(`${value}=${query[value]}`)
		});
		const queryString = queryParams.join('&') || '';
		const books = await fetch(`${this.host}/books?${queryString}`);
		return books.json();
	}
}
