import Component from '@glimmer/component';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';
import {tracked} from '@glimmer/tracking';

export default class BookFormComponent extends Component {
	@service store;

	tagList = ['detective', 'novel', 'adventures', 'comedy'];

	@tracked title = this.args.book.title;
	@tracked pages = this.args.book.pages;
	@tracked description = this.args.book.description;
	@tracked cover = this.args.book.cover;
	@tracked author = this.args.book.author;
	@tracked raiting = this.args.book.raiting;
	@tracked tags = this.args.book.tags;

	@action
	searchAuthor(query) {
		console.log(this.args.book);
		return this.store.query('author', {q: query});
	}

	@action
	async saveBook() {
		this.args.submit({
			title: this.title,
			pages: this.pages,
			description: this.description,
			cover: this.cover,
			author: this.author,
			tags: this.tags,
			raiting: this.raiting,
		});
	}
}
