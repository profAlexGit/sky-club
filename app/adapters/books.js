import ApplicationAdapter from './application';

export default class BooksAdapter extends ApplicationAdapter {
	shouldReloadAll(store, snapshotsArray) {
		return true;
	}

	async findRecord(store, type, id, snapshot) {
		const book = await fetch(`${this.host}/books/${id}?_expand=authors`);
		return book.json();
    }
}
