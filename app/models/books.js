import Model, {attr, belongsTo} from '@ember-data/model';

export default class BooksModel extends Model {
	@attr authors;
	@attr title;
	@attr pages;
	@attr cover;
	@attr description;
	@attr tags;
    @attr raiting;

    get authorName() {
        return `${this.authors.firstName} ${this.authors.lastName}`
    }
}
