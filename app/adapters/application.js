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
			url += '?_embed=reports';
		}

		if (modelName === 'speaker' && requestType === 'findRecord' && id) {
			url+='?_embed=orders&_embed=reports'
		}

		if (modelName === 'meeting' && requestType === 'findAll') {
			url += '?_embed=orders&_embed=reports';
		}

		if (modelName === 'order' && requestType === 'findAll') {
			url += '?_sort=date';
		}

		return url;
	}
	
}
