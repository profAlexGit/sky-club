import Route from '@ember/routing/route';
import {tracked} from '@glimmer/tracking';

export default class AdminPanelCreateMeetingRoute extends Route {
    @tracked showModal = true;
    
	async model() {
		let promise = new Promise((res, rej) => {
			res(this.store.findAll('order'));
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
}
