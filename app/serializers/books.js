import ApplicationSerializer from './application';

export default class BooksSerializer extends ApplicationSerializer {
	// attrs = {
	// 	authors: {
	// 		serialize: 'records',
	// 		deserialize: 'records',
	// 	},
	// };

	normalizeResponse(store, primaryModelClass, payload, id, requestType) {
		if (requestType === 'query') {
			payload.forEach((book) => {
				book.tags = book.tags.join(', ');
			});	
		}

		if (requestType === 'createRecord') {
			payload.tags = payload.tags.join(', ');
		}
		
		return super.normalizeResponse(...arguments);
	}

	serialize(snapshot, options) {
		let json = super.serialize(...arguments);
		if (json.tags) {
			json.tags = json.tags.split(',');
		} else {
			json.tags = [];
		}
		json.authorsId = json.authors.id;
		delete json.authors;
		return json;
	}
}
