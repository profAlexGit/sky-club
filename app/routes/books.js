import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import {action} from '@ember/object';


export default class BooksRoute extends Route {
	@service booksService;

	queryParams = {
		search: {
			refreshModel: true,
		},
		tag: {
			refreshModel: true,
		},
	};

	searchBooks(search, tag) {
		const queryParams = {};
		if (search) {
			queryParams.q = search;
		}
		if (tag && tag !== 'all') {
			queryParams.tags_like = tag;
		}
		return this.store.query('book', queryParams);
	}

	async model({search, tag}) {
		let promise = new Promise((res, rej) => {
			res((search || tag !== 'all') ? this.searchBooks(search, tag) : this.store.findAll('book'));
		})
			.then((data) => {
				this.controller.model = data;
			})
			.finally(() => {
				if (promise === this.lastPromise) {
					this.controller.isLoading = false;
				}
			});

		this.lastPromise = promise;
		return {
			isLoading: true,
		};
	}

	setupController(controller, model) {
		super.setupController(...arguments);

		controller.isLoading = true;
	}

	resetController(controller, isExiting) {
		if (isExiting) {
			controller.isLoading = false;
			this.lastPromise = false;
		}
	}

	@action
	refreshModel() {
		this.refresh();
	}

	@action
	loading() {
		return true;
	}
}