import Model, {attr, belongsTo, hasMany} from '@ember-data/model';

export default class BookModel extends Model {
	@attr title;
	@attr pages;
	@attr cover;
	@attr description;
	@attr tags;
    @attr raiting;
    
	@belongsTo('author') author;
	@hasMany('report') reports;

	get getReports() {
		return this.reports;
	}
}
