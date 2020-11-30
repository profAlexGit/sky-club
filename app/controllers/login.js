import Controller from '@ember/controller';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';
import {tracked} from '@glimmer/tracking';

export default class LoginController extends Controller {
	@service session;
    @tracked errors;
    
    @tracked username = '';
    @tracked password = '';

	@action
	async login() {
		try {
			await this.session.authenticate('authenticator:jwt', {
				username: this.username,
				password: this.password,
			});
		} catch (e) {
			this.send('error', e);
		}
	}

	@action
	error(error, transition) {
		if (error instanceof Error) {
			return true;
		}

		this.errors = error.json.errors;
		return false;
	}

	resetErrors() {
		this.errors = {};
	}
}
