import Component from '@glimmer/component';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';

export default class MeetingCardComponent extends Component {


    @tracked meeting = this.args.meeting;
    @tracked reports = this.meeting.reports;

    get cardClass() {
        const className = 'card mx-3 text-white';
        if (this.meeting.status === "complete") {
            return className + ' bg-success';
        }
        return className + ' bg-primary';
    }

    get listItemClass() {
        const className = 'list-group-item';
		if (this.meeting.status === 'complete') {
			return className + ' list-group-item-success';
		}
		return className + ' list-group-item-primary';
    }

    get statusOrDate() {
		if (this.meeting.status === 'complete') {
			return 'завершена';
		}
		return this.meeting.date;
    }

}
