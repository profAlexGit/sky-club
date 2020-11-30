import Component from '@glimmer/component';
import {action} from '@ember/object';


export default class AccountReportOrderTableComponent extends Component {
	@action
	deleteOrder(id) {
        this.args.delete(id);
	}
}
