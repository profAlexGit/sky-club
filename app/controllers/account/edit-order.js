import Controller from '@ember/controller';
import {action} from '@ember/object';
import {DateTime} from 'luxon';
import {assign} from '@ember/polyfills';


export default class AccountEditOrderController extends Controller {
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
		debugger;
		this.model.date = date;
	}

	@action
	async saveOrder(order) {
		try {
            // const order = {
			// 	date: this.model.date,
			// 	speaker: this.store.peekRecord('speaker', 1),
			// 	book: this.model.book,
			// 	status: 'new',
            // };
            debugger
            await assign(this.model, order);
			await this.model.save();

			this.transitionToRoute('account');
			
			// const newOrder = this.store.createRecord('order', order);

			// await newOrder.save();

			// this.transitionToRoute('account');
		} catch (e) {
			throw new Error('some error');
		}
	}
}
