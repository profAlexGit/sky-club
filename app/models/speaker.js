import Model, {attr, hasMany} from '@ember-data/model';

export default class SpeakerModel extends Model {
	@attr firstName;
	@attr lastName;

	@hasMany('order') orders;
	@hasMany('report') reports;

	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}

	get validationOrders() {
		return this.orders.filter((order) => order.status === 'validation');
	}

	get inProgressOrders() {
		return this.orders.filter((order) => order.status === 'inProgress');
	}

	get getId() {
		return this.id;
	}
}
