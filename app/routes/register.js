import Route from '@ember/routing/route';

export default class RegisterRoute extends Route {
	model() {
		return {
			email: '',
            username: '',
            firstName: '',
            lastName: '',
			password: '',
			passwordConfirmation: '',
		};
	}

	resetController(controller, isExiting, transition) {
		super.resetController(...arguments);
		if (isExiting) {
			controller.resetErrors();
		}
	}
}
