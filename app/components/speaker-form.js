import Component from '@glimmer/component';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';
import {tracked} from '@glimmer/tracking';

export default class SpeakerFormComponent extends Component {
	@service store;

	@tracked firstName = this.args.speaker.firstName;
	@tracked lastName = this.args.speaker.lastName;

	@action
	async saveSpeaker() {
		this.args.submit({
			firstName: this.firstName,
			lastName: this.lastName,
		});
	}
}
