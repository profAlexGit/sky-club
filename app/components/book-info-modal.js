import Component from '@glimmer/component';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import {inject as service} from '@ember/service';

export default class BookInfoModalComponent extends Component {
	@service store;

    @tracked isLoading = true;
    @tracked book;
    @tracked reports;

	bookInfo = this.store.findRecord('book', this.args.id).then((book) => {
        this.book = book;
        this.reports = book.reports;
		this.isLoading = false;
		// return book;
    });

    get getReports() {
        return this.book.reports
    }

	@action
	closeModal() {
        this.args.closeModal();
    }
}
