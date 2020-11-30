import Model, {attr, belongsTo} from '@ember-data/model';
import {DateTime} from 'luxon';


export default class OrderModel extends Model {
	@attr status;
	@attr date;

	@belongsTo('speaker') speaker;
	@belongsTo('book') book;
	@belongsTo('meeting') meeting;

	get getDate() {
        return DateTime.fromISO(this.date).toFormat('yyyy-MM-dd');
	}
}
