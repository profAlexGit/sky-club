import Component from '@glimmer/component';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import {inject as service} from '@ember/service';

export default class NewAuthorModalComponent extends Component {
	@tracked showModal = false;
	@service store;

	@action
	closeModal() {
		this.showModal = false;
	}

	author = {
		firstName: '',
		lasName: '',
	};

	@action
	async saveAuthor(author) {
		try {
			const newAuthor = this.store.createRecord('author', author);
			await newAuthor.save();
			this.closeModal();
			this.args.onSave(newAuthor);
		} catch (e) {
			throw new Error('some error');
		}
	}
}
