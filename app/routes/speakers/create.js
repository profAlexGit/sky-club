import Route from '@ember/routing/route';
import {tracked} from '@glimmer/tracking';


export default class SpeakersCreateRoute extends Route {
	@tracked showModal = true;

	model() {
		return {
			firstName: '',
			lastName: '',
		};
	}
}
