import Controller from '@ember/controller';
import {action} from '@ember/object';


export default class SpeakersInfoController extends Controller {
	@action
	closeModal() {
		this.transitionToRoute('speakers');
	}
}
