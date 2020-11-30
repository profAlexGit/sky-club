import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';

export default class MeetingItemComponent extends Component {
	// @tracked meetings = [];

	get meetingsList() {
		if (this.args.filter) {
			return this.getFilterMeetings(this.args.filter);
		}

		return this.args.meetings;
	}

	getFilterMeetings(filter) {
		return this.args.meetings.filter((meeting) => {
			return meeting.status === filter;
		});
	}
}
