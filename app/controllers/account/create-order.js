import Controller from '@ember/controller';
import {action} from '@ember/object';
import {DateTime} from 'luxon';


export default class AccountCreateOrderController extends Controller {
	@action
	searchBook(query) {
		return this.store.query('book', {q: query});
	}

	@action
	closeModal() {
		this.transitionToRoute('account');
	}

	@action
	onChangeDate(_date, dateStr) {
		const date = DateTime.fromISO(dateStr);
		this.model.date = date;
	}

	@action
	async saveOrder() {
		try {
			const order = {
				date: this.model.date,
				speaker: this.store.peekRecord('speaker', 1),
				book: this.model.book,
				status: 'new'
			};
			const newOrder = this.store.createRecord('order', order);

			await newOrder.save();

			this.transitionToRoute('account');
		} catch (e) {
			throw new Error('some error');
		}
	}
}
