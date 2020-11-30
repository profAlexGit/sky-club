import Route from '@ember/routing/route';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';



export default class AdminPanelRoute extends Route {
	queryParams = {
		status: {
			refreshModel: true,
		},
		speakerId: {
			refreshModel: true,
		},
	};

	searchMeeting(status, speakerId) {
		const queryParams = {};
		if (status) {
			queryParams.status = status;
		}

		if(speakerId) {
			queryParams.speaker = speakerId
		}
		
		return this.store.query('meeting', queryParams);
	}

	async model({status, speakerId}) {
		let promise = new Promise((res, rej) => {
			res(
				status !== 'all'
					? this.searchMeeting(status)
					: this.store.findAll('meeting')
			);

		})
			.then((data) => {
				if (speakerId) {
					const d = data.filter((meeting) => {
						const reports = meeting.reports;
						const filteredReports = reports.find((report) => {
							return report.speaker.get('getId') === speakerId;}
							)
						if (filteredReports) {
							return meeting
						}
					})
					this.controller.model = d;
					return
				}
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
