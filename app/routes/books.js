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

	async model({search, tag}) {
		let promise = new Promise((res, rej) => {
			res(this.booksService.fetchBooks(this.store, search, tag));
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
	loading() {
		return true;
	}
}