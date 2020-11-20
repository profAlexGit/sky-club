import Route from '@ember/routing/route';
import {tracked} from '@glimmer/tracking';


export default class BooksCreateRoute extends Route {
	@tracked showModal = true;

	model() {
        return {
            title: '',
            cover: '',
            description: '',
            author: null,
            tags: [],
            pages: '',
            raiting: ''
        }
	}
}
