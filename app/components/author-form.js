import Component from '@glimmer/component';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';
import {tracked} from '@glimmer/tracking';

export default class AuthorFormComponent extends Component {
	@service store;

	@tracked firstName = this.args.author.firstName;
	@tracked lastName = this.args.author.lastName;

	@action
	async saveAuthor() {
		this.args.submit({
			firstName: this.firstName,
			lastName: this.lastName,
		});
	}
}
