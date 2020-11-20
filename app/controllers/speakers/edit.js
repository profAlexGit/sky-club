import Controller from '@ember/controller';
import {assign} from '@ember/polyfills';
import {action} from '@ember/object';

export default class SpeakersEditController extends Controller {
    
    @action
	closeModal() {
		this.transitionToRoute('speakers');
	}

	@action
	async saveBook(book) {
		try {
			assign(this.model, book);
			await this.model.save();

			this.transitionToRoute('speakers');
		} catch (e) {
			throw new Error('unknown error');
		}
	}
}
