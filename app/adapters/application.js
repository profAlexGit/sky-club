import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
	host = 'https://fierce-atoll-72104.herokuapp.com';
	headers = {
		'Content-Type': 'application/json',
	};

	buildURL(modelName, id, snapshot, requestType, query) {
		let url = super.buildURL(...arguments);
		if (modelName === 'author' && requestType === 'findRecord' && id) {
			url += '?_embed=books';
		}

		if (modelName === 'book' && requestType === 'findRecord' && id) {
			url += '?_embed=reviews';
		}

		return url;
	}
	
}
