import Model, {belongsTo} from '@ember-data/model';

export default class ReportModel extends Model {
    @belongsTo("speaker") speaker;
    @belongsTo("meeting") meeting;
    @belongsTo("book") book;

    get getMeeting() {
        return this.meeting.get('getDate');
    }

    get getSpeaker() {
        return this.speaker.get('fullName');
    }
}
