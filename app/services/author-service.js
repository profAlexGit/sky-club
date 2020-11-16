import Service from '@ember/service';

export default class AuthorServiceService extends Service {
	authors = null;

	async fetchAuthors(store) {
		let response = await store.findAll('authors');
		return response.json();
	}
}
