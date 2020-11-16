import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
	host = 'https://fierce-atoll-72104.herokuapp.com';
	headers = {
		'Content-Type': 'application/json',
	};
}
