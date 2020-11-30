import Controller from '@ember/controller';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';

const meetingStatuses = ['all', 'complete', 'active'];

export default class AdminPanelController extends Controller {
	queryParams = ['status', 'speakerId'];
	defaultSpeaker = {
		fullName: 'all',
	};

	@tracked statuses = meetingStatuses;
	@tracked status = this.statuses[0];
	@tracked speaker = this.defaultSpeaker;
	@tracked speakerId = null;

	@tracked isLoading;

	get speakers() {
		return this.store.findAll('speaker').then((data) => {
			return [this.defaultSpeaker, ...data.toArray()];
		});
	}

	@action
	handleChangeSpeaker(value) {
		this.speaker = value;
		this.speakerId = value.id;
	}

	@action
	searchStatus(value) {}
}
