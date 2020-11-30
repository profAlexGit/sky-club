import Controller from '@ember/controller';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';



export default class MeetingsController extends Controller {
	@tracked isLoading;

	@action
	getCompleteMeetings() {
		debugger
		return this.model.filter((meeting) => meeting.status === 'complete');
	}
}
