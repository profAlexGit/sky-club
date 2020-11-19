import Controller from '@ember/controller';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';

export default class SpeakersController extends Controller {
	queryParams = ['search'];

	@tracked isLoading;
	@tracked isUpdate = false;
	@tracked currentSpeaker = null;
	@tracked search = '';
	modalTitle = '';

	@tracked firstName;
	@tracked lastName;

	@action
	handleCreateSpeaker() {
		this.modalTitle = 'Добавление';
		this.firstName = '';
		this.lastName = '';
		this.isUpdate = true;
	}

	@action
	async handleUpdateClick(id) {
		this.modalTitle = 'Редактирование';
		this.currentSpeaker = await this.store.peekRecord('speakers', id);
		this.firstName = this.currentSpeaker.firstName;
		this.lastName = this.currentSpeaker.lastName;
		this.isUpdate = true;
	}

	@action
	async handleDeleteSpeaker(id) {
		const speaker = this.store.peekRecord('speakers', id);
		speaker.destroyRecord();
	}

	@action
	async submitUpdateHandler() {
		let self = this;
		if (!this.currentSpeaker) {
			const speaker = await this.store.createRecord('speakers', {
				firstName: this.firstName,
				lastName: this.lastName,
			});
			speaker.save().then(async function (data) {
				self.send('refreshModel');
				self.transitionToRoute('speakers');
			});
		} else {
			const speaker = await this.store
				.findRecord('speakers', this.currentSpeaker.id)
				.then((speaker) => {
					speaker.firstName = this.firstName;
					speaker.lastName = this.lastName;

					speaker.save().then(function (data) {
						self.transitionToRoute('speakers');
					});
				});
		}

		this.closeModal();
		this.currentSpeaker = null;
		this.isUpdate = false;
	}

	@action
	closeModal() {
		this.currentSpeaker = null;
		this.isUpdate = false;
	}
}
