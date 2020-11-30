import Controller from '@ember/controller';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';


export default class AdminPanelCreateMeetingController extends Controller {
	@tracked isLoading;

	@action
	closeModal() {
		this.transitionToRoute('admin-panel');
	}

	@action
	setLoading(value) {
		this.isLoading = value;
	}

	@action
	async submit(approveOrders, newMeeting) {
		this.isLoading = true;

		const meeting = this.store.createRecord('meeting', newMeeting);
		const savedMeeting = await meeting.save().then((data)=> {
			return data;
		})

		approveOrders.forEach(order => {
			const newReport = {
				speaker: order.speaker,
				book: order.book,
				meeting: savedMeeting,
				date: order.date
			};
			const report = this.store.createRecord('report', newReport);
			report.save().then(() => {
				order.destroyRecord();
			});
			
		})
		this.transitionToRoute('admin-panel');
		this.isLoading = false;
	}
}
