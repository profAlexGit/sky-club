import Model, {attr, hasMany} from '@ember-data/model';

export default class AuthorModel extends Model {
	@attr firstName;
	@attr lastName;

	@hasMany('book' /*, { async: false }*/) books;

	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}
}
