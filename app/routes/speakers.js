import Route from '@ember/routing/route';
import {action} from '@ember/object';


export default class SpeakersRoute extends Route {
	queryParams = {
		search: {
			refreshModel: true,
		},
	};

	searchSpeaker(search) {
		const queryParams = {q: search};
		return this.store.query('speaker', queryParams);
	}

	async model({search}) {
		let options = {};
		if (search) {
			options.q = search;
		}

		let promise = new Promise((res, rej) => {
			res(search ? this.searchSpeaker(search) : this.store.findAll('speaker'));
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
