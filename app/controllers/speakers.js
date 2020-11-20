import Controller from '@ember/controller';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';

export default class SpeakersController extends Controller {
	queryParams = ['search'];

	@tracked isLoading;
	@tracked search = '';
	modalTitle = '';

	@action
	async handleDeleteSpeaker(id) {
		const speaker = this.store.peekRecord('speaker', id);
		speaker.destroyRecord();
	}
}
