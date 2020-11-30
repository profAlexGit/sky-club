import Component from '@glimmer/component';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import {inject as service} from '@ember/service';
import {DateTime} from 'luxon';

export default class OrderFormComponent extends Component {
	@service store;

	@tracked date = this.args.order.date;
	@tracked book = this.args.order.book;

	get minDate() {
		const currentDate = new Date();
		return currentDate.toISOString();
	}

	@action
	onChangeDate(_date, dateStr) {
		let date = new Date().toISOString(); 
		if (dateStr) {
			date = DateTime.fromISO(dateStr);
		}
		
		this.date = new Date(date).toISOString(); //dateStr.toISOString();
	}

	@action
	searchBook(query) {
		return this.store.query('book', {q: query});
	}

	@action
	async saveOrder() {
		this.args.submit({
			date: this.date,
			book: this.book,
		});
	}
}
