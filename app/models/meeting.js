import Model, {attr, hasMany} from '@ember-data/model';
import {DateTime} from 'luxon';


export default class MeetingModel extends Model {
    @attr date;
    @attr status;

    @hasMany('order') orders;
    @hasMany('report') reports;

    get getDate() {
        return this.date;
        // return this.date.toFormat('yyyy-MM-dd');
    }

}
