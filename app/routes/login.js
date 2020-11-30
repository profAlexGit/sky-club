import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default class LoginRoute extends Route.extend(UnauthenticatedRouteMixin) {
	model() {
		return {
			email: '',
			password: '',
		};
	}

	resetController(controller, isExiting, transition) {
		super.resetController(...arguments);
		if (isExiting) {
			controller.resetErrors();
		}
	}
}
