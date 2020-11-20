import Controller from '@ember/controller';
import {action} from '@ember/object';


export default class SpeakersCreateController extends Controller {
	@action
	closeModal() {
		this.transitionToRoute('speakers');
	}

	@action
	async saveBook(speaker) {
		try {
			const newSpeaker = this.store.createRecord('speaker', speaker);

			await newSpeaker.save();

			this.transitionToRoute('speakers');
		} catch (e) {
			throw new Error('some error');
		}
	}
}
