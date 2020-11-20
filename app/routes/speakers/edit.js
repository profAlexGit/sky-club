import Route from '@ember/routing/route';
import {tracked} from '@glimmer/tracking';


export default class SpeakersEditRoute extends Route {
	@tracked showModal = true;

	model({id}) {
		return this.store.findRecord('speaker', id);
	}
}
