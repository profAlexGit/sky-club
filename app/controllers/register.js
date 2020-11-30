import Controller from '@ember/controller';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';


export default class RegisterController extends Controller {
    @tracked errors;
    
    @tracked email = '';
    @tracked username = '';
    @tracked firstName = '';
    @tracked lastName = '';
	@tracked password = '';
	@tracked passwordConfirmation = '';

	@action
	async handleRegister() {
        const user = {
			email: this.email,
			username: this.username,
			firstName: this.firstName,
			lastName: this.lastName,
			password: this.password,
			passwordConfirmation: this.passwordConfirmation,
        };
        
        let newUser;
		try {
			newUser = this.store.createRecord('user', user);
			await newUser.save();

			this.transitionToRoute('index');
		} catch (e) {
			e.user = newUser;
			this.send('error', e);
		}
	}

	@action
	error(error, transition) {
		this.errors = error.user.errors;
		return false;
	}

	resetErrors() {
		this.errors = {};
	}
}
