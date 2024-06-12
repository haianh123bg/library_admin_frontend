import BookModel from './BookModel';
import UserModel from './UserModel';

class BorrowingFormModel {
    borrowing_form_id: number;
    borrowing_form_date: string;
    borrowing_form_type: string;
    borrowing_form_deposit: number;
    borrowing_form_due_date: string;
    user: UserModel;
    book: BookModel;

    constructor(
        borrowing_form_id: number,
        borrowing_form_date: string,
        borrowing_form_type: string,
        borrowing_form_deposit: number,
        borrowing_form_due_date: string,
        user: UserModel,
        book: BookModel,
    ) {
        this.borrowing_form_id = borrowing_form_id;
        this.borrowing_form_date = borrowing_form_date;
        this.borrowing_form_type = borrowing_form_type;
        this.borrowing_form_deposit = borrowing_form_deposit;
        this.borrowing_form_due_date = borrowing_form_due_date;
        this.user = user;
        this.book = book;
    }
}

export default BorrowingFormModel;
