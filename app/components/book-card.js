import Component from '@glimmer/component';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';

export default class BookCardComponent extends Component {
	@tracked showModal = false;

	title = this.args.book.title;
	cover = this.args.book.cover;
	description = this.args.book.description;
	tags = this.args.book.tags;
	raiting = this.args.book.raiting;
	author = this.args.book.author;
	id = this.args.book.id;

	get authorName() {
		return this.author.fullName;
	}

	@action
	handleClick() {
		this.args.handleClick(this.id);
    }
    
    @action
    handleCardClick() {
        this.showModal = true;
    }

	@action
	closeModal() {
		this.showModal = false;
	}
}
