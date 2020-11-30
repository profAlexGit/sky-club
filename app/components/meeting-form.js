import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';
import {DateTime, Interval} from 'luxon';

export default class MeetingFormComponent extends Component {
	@service store;

	@tracked date = null;
	@tracked orders = null;

	@tracked orders = this.args.orders.toArray();

	@tracked approveOrders = this.args.approveOrders || [];

	ordersSort(orders) {
		orders.sort((a, b) => {
			const aDate = Date.parse(a.date);
			const bDate = Date.parse(b.date);
			if (aDate > bDate) {
				return 1;
			}

			if (aDate < bDate) {
				return -1;
			}

			return 0;
		});
	}

	get minDate() {
		return this.approveOrders[this.approveOrders.length-1].date;
	}

	get isHasPlan() {
		return this.approveOrders.length > 0;
	}

	@action
	onChangeDate(_date, dateStr) {
		const date = DateTime.fromFormat(dateStr, 'y-M-d');
		this.date = date;
		this.date = dateStr;
	}

	@action
	handleApprove(id) {
		const orderIdx = this.orders.findIndex(order => order.id === id);
		this.approveOrders = [...this.approveOrders, this.orders[orderIdx]];
		this.orders = [...this.orders.slice(0, orderIdx), ...this.orders.slice(orderIdx+1)];
		this.ordersSort(this.approveOrders);
	}

	@action
	handleResetApprove(id) {
		const orderIdx = this.approveOrders.findIndex((order) => order.id === id);
		this.orders = [...this.orders, this.approveOrders[orderIdx]];
		this.approveOrders = [
			...this.approveOrders.slice(0, orderIdx),
			...this.approveOrders.slice(orderIdx + 1),
		];

		this.ordersSort(this.orders);
	}

	@action
	async saveOrder() {
		if (!this.date) {
			alert('Выберите дату встречи');
			return;
		}

		const newMeeting = {
			date: this.date,
			status: 'active',
		};

		this.args.submit(this.approveOrders, newMeeting);
	}
}
